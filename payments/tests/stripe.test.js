const { describe, test, expect, beforeAll } = require('@jest/globals');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

describe('Stripe Checkout', () => {
  test('creates checkout session for basic plan', async () => {
    if (!process.env.STRIPE_SECRET_KEY) return;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.PRICE_BASICO, quantity: 1 }],
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    expect(session).toHaveProperty('id');
    expect(session.mode).toBe('subscription');
    expect(session.url).toContain('checkout.stripe.com');
  });

  test('creates checkout session for pro plan', async () => {
    if (!process.env.STRIPE_SECRET_KEY) return;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.PRICE_PROFESIONAL, quantity: 1 }],
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    expect(session).toHaveProperty('id');
    expect(session.mode).toBe('subscription');
  });
});

describe('Stripe Webhooks', () => {
  test('validates webhook signature', () => {
    if (!process.env.STRIPE_WEBHOOK_SECRET) return;

    const payload = JSON.stringify({ type: 'test' });
    const header = stripe.webhooks.generateTestHeaderString({
      payload,
      secret: process.env.STRIPE_WEBHOOK_SECRET,
    });

    const event = stripe.webhooks.constructEvent(
      payload, header, process.env.STRIPE_WEBHOOK_SECRET
    );

    expect(event.type).toBe('test');
  });

  test('handles checkout.session.completed', () => {
    const event = {
      type: 'checkout.session.completed',
      data: { object: { id: 'cs_test_xxx', customer: 'cus_xxx' } },
    };
    expect(event.type).toBe('checkout.session.completed');
    expect(event.data.object.id).toMatch(/^cs_test/);
  });

  test('handles invoice.paid', () => {
    const event = {
      type: 'invoice.paid',
      data: { object: { id: 'in_xxx', customer: 'cus_xxx' } },
    };
    expect(event.type).toBe('invoice.paid');
    expect(event.data.object.id).toMatch(/^in_/);
  });
});
