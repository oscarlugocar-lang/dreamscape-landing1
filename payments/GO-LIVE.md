# Go-Live Checklist — Dreamscape Payments

## ⬜ Pre-requisitos
- [ ] Cuenta Stripe activa (no en modo test)
- [ ] Dominio propio (opcional, GitHub Pages funciona)
- [ ] API keys de Stripe generadas

## ⬜ Stripe Dashboard
- [ ] Crear productos **Básico** (€299/mes) y **Profesional** (€799/mes)
- [ ] Copiar `price_xxx` IDs → `.env`
- [ ] Configurar webhook → `https://<app>.vercel.app/api/webhook`
- [ ] Eventos webhook: `checkout.session.completed`, `invoice.paid`, `customer.subscription.*`

## ⬜ Backend
- [ ] `npm install` en `payments/`
- [ ] Crear base de datos PostgreSQL (Supabase gratis o local)
- [ ] `DATABASE_URL` en `.env`
- [ ] `npx prisma db push` para crear tablas
- [ ] `npm test` — todos los tests pasan

## ⬜ Deploy
- [ ] `cd payments && vercel --prod`
- [ ] Configurar env vars en Vercel Dashboard
- [ ] Probar checkout real con tarjeta de prueba (`4242 4242 4242 4242`)
- [ ] Verificar webhook en Stripe Dashboard (logs)

## ⬜ Landing Page
- [ ] Reemplazar `pk_test_PLACEHOLDER` con publishable key real
- [ ] Reemplazar `API_URL` con URL real de Vercel
- [ ] Reemplazar `price_xxx` en `prices` object
- [ ] Commit + push → deploy automático

## ⬜ Post-Go-Live
- [ ] Stripe Dashboard → Activar modo producción
- [ ] Monitorear primeros 5 pagos
- [ ] Verificar emails de confirmación Stripe
- [ ] Backup de `.env` en password manager

---

## Comandos rápidos

```bash
# Instalar
cd payments && npm install

# Probar
npm test

# DB
npx prisma db push
npx prisma studio

# Deploy
vercel --prod

# Escuchar webhooks local
stripe listen --forward-to localhost:4242/api/webhook
```
