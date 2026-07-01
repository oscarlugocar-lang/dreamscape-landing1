const express = require('express');
const Stripe = require('stripe');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const processed = new Set();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (processed.has(session.id)) {
          return res.json({ received: true, idempotent: true });
        }
        processed.add(session.id);
        const cus = await stripe.customers.retrieve(session.customer);
        const customer = await prisma.customer.upsert({
          where: { stripeId: session.customer },
          update: { email: cus.email, name: cus.name },
          create: {
            stripeId: session.customer,
            email: cus.email || session.customer_email || '',
            name: cus.name,
          },
        });
        if (session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription);
          await prisma.subscription.upsert({
            where: { stripeId: sub.id },
            update: { status: sub.status },
            create: {
              stripeId: sub.id,
              customerId: customer.id,
              status: sub.status,
              priceId: sub.items.data[0]?.price.id || '',
              plan: 'pro',
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
            },
          });
        }
        break;
      }
      case 'invoice.paid': {
        const invoice = event.data.object;
        if (processed.has(invoice.id)) {
          return res.json({ received: true, idempotent: true });
        }
        processed.add(invoice.id);
        await prisma.invoice.create({
          data: {
            stripeId: invoice.id,
            subscriptionId: invoice.subscription,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: invoice.status,
            paid: invoice.paid,
            invoiceUrl: invoice.hosted_invoice_url,
          },
        });
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const existing = await prisma.subscription.findUnique({ where: { stripeId: sub.id } });
        if (existing) {
          await prisma.subscription.update({
            where: { stripeId: sub.id },
            data: {
              status: sub.status,
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
              cancelAtPeriodEnd: sub.cancel_at_period_end,
            },
          });
        } else {
          const customer = await prisma.customer.upsert({
            where: { stripeId: sub.customer },
            update: {},
            create: { stripeId: sub.customer, email: '', name: null },
          });
          await prisma.subscription.create({
            data: {
              stripeId: sub.id,
              customerId: customer.id,
              status: sub.status,
              priceId: sub.items.data[0]?.price.id || '',
              plan: 'pro',
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
            },
          });
        }
        break;
      }
      default:
        console.log(`Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error('webhook processing error:', err.message);
    if (process.env.ERROR_WEBHOOK_URL) {
      fetch(process.env.ERROR_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `Webhook error: ${err.message}`, event: event?.type }),
      }).catch(() => {});
    }
    return res.status(500).json({ error: 'Webhook processing failed' });
  }

  res.json({ received: true });
});

module.exports = app;
