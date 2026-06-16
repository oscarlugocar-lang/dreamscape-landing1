const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: process.env.DOMAIN }));
app.use(express.static('public'));
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  basic: process.env.PRICE_BASICO,
  pro: process.env.PRICE_PROFESIONAL,
};

app.post('/api/create-checkout', async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/create-portal', async (req, res) => {
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
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => {
  console.log(`Dreamscape Payments API running on port ${PORT}`);
});
