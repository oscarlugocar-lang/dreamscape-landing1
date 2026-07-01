const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
app.use(cors({ origin: process.env.DOMAIN }));
app.use(express.static('public'));
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests, try again later' },
});

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  basic: process.env.PRICE_BASICO,
  pro: process.env.PRICE_PROFESIONAL,
};

function requireApiKey(req, res, next) {
  const key = req.headers['x-api-key'];
  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.post('/api/create-checkout', limiter, requireApiKey, async (req, res) => {
  try {
    const { priceId, customerEmail } = req.body;
    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      success_url: `${process.env.DOMAIN}/dreamscape-landing1/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/dreamscape-landing1/?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('checkout error:', err);
    res.status(500).json({ error: 'Error creating checkout session' });
  }
});

app.post('/api/create-portal', requireApiKey, async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const portal = await stripe.billingPortal.sessions.create({
      customer: session.customer,
      return_url: process.env.DOMAIN,
    });
    res.json({ url: portal.url });
  } catch (err) {
    console.error('portal error:', err);
    res.status(500).json({ error: 'Error creating portal session' });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Dreamscape Payments API running on port ${PORT}`);
});
