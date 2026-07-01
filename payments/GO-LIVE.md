# Go-Live Checklist — Dreamscape Payments

## Pre-requisitos
- [ ] Cuenta Stripe activa (no en modo test)
- [ ] Dominio propio (opcional, GitHub Pages funciona)
- [ ] API keys de Stripe generadas

## Stripe Dashboard
- [ ] Crear productos **Básico** (€299/mes) y **Profesional** (€799/mes)
- [ ] Copiar `price_xxx` IDs → `.env` como `PRICE_BASICO` y `PRICE_PROFESIONAL`
- [ ] Configurar webhook → `https://<app>.vercel.app/api/webhook`
- [ ] Eventos webhook: `checkout.session.completed`, `invoice.paid`, `customer.subscription.*`
- [ ] Generar `STRIPE_WEBHOOK_SECRET` → `.env`

## Backend
- [ ] `npm install` en `payments/`
- [ ] Crear base de datos PostgreSQL (Supabase gratis o local)
- [ ] `DATABASE_URL` en `.env`
- [ ] `npx prisma db push` para crear tablas
- [ ] `npm test` — todos los tests pasan

## Variables de Entorno (.env)
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...
DOMAIN=https://oscarlugocar-lang.github.io
API_KEY=<generar clave aleatoria segura>
PRICE_BASICO=price_xxx
PRICE_PROFESIONAL=price_xxx
ERROR_WEBHOOK_URL=<opcional: Slack/Discord webhook>
```

## Deploy
- [ ] `cd payments && vercel --prod`
- [ ] Configurar env vars en Vercel Dashboard
- [ ] Agregar `API_KEY` en el frontend (index.html `API_URL` headers)
- [ ] Probar checkout real con tarjeta de prueba (`4242 4242 4242 4242`)
- [ ] Verificar webhook en Stripe Dashboard (logs)

## Landing Page
- [ ] Reemplazar `pk_test_PLACEHOLDER` con publishable key real
- [ ] Reemplazar `API_URL` con URL real de Vercel
- [ ] Commit + push → deploy automático

## Post-Go-Live
- [ ] Stripe Dashboard → Activar modo producción
- [ ] Monitorear primeros 5 pagos
- [ ] Verificar que webhooks persisten en DB (`npx prisma studio`)
- [ ] Verificar emails de confirmación Stripe
- [ ] Backup de `.env` en password manager

## Rollback
- [ ] **Stripe**: Desactivar webhook endpoint o cambiar secret
- [ ] **Vercel**: `vercel rollback` al deploy anterior
- [ ] **Landing**: `git revert HEAD && git push`
- [ ] **DB**: Restaurar backup de base de datos

## Monitoring
- [ ] Revisar logs de Vercel semanalmente
- [ ] Revisar Stripe Dashboard > Webhooks > logs
- [ ] Configurar `ERROR_WEBHOOK_URL` para alertas de webhook

## Comandos rápidos

```bash
# Instalar
cd payments && npm install

# Desarrollar
npm run dev

# Probar
npm test

# DB
npx prisma db push
npx prisma studio

# Deploy
vercel --prod

# Rollback
vercel rollback

# Escuchar webhooks local
stripe listen --forward-to localhost:4242/api/webhook
```
