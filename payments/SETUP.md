# Stripe Setup — Dreamscape Payments

## 1. Crear productos en Stripe Dashboard

1. Ir a https://dashboard.stripe.com/products
2. Crear 2 productos de suscripción:
   - **Básico** — €299/mes
   - **Profesional** — €799/mes
3. Copiar los `price_xxx` IDs

## 2. Configurar variables de entorno

Copiar `.env.example` a `.env` y llenar:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
DOMAIN=https://oscarlugocar-lang.github.io
PRICE_BASICO=price_1xxxxx
PRICE_PROFESIONAL=price_1xxxxx
```

## 3. Desplegar a Vercel

```bash
cd payments
vercel --prod
```

## 4. Configurar Webhook en Stripe

1. Stripe Dashboard → Developers → Webhooks
2. Añadir endpoint: `https://<tu-app>.vercel.app/api/webhook`
3. Eventos a escuchar:
   - `checkout.session.completed`
   - `invoice.paid`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copiar `whsec_xxx` signing secret

## 5. Actualizar landing page

En `index.html`, reemplazar:
- `pk_test_PLACEHOLDER` con tu publishable key real
- `API_URL` con tu URL de Vercel
- `prices.basic` y `prices.pro` con los `price_xxx` IDs
