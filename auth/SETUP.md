# Auth Setup — Dreamscape

## Providers disponibles
- **GitHub** — OAuth rápido para developers
- **Google** — OAuth masivo para usuarios generales
- **Email** — Magic links (sin password)

## Variables de Entorno (.env)
```
AUTH_SECRET=<generar con: npx auth secret>
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
EMAIL_SERVER=smtp://user:pass@smtp.resend.com:587
EMAIL_FROM=noreply@dreamscape.io
DATABASE_URL=postgresql://...
```

## Configuración rápida

1. Crear OAuth apps:
   - GitHub: Settings → Developer settings → OAuth Apps
   - Google: Cloud Console → APIs & Services → Credentials

2. Generar `AUTH_SECRET`:
   ```bash
   npx auth secret
   ```

3. Configurar SMTP para Magic Links:
   - Resend, SendGrid, o Mailgun

4. Inicializar DB:
   ```bash
   cd auth
   npm install
   npx prisma db push
   ```

5. Probar:
   ```bash
   npm run dev
   ```

## Rutas protegidas
| Ruta | Acceso |
|------|--------|
| `/` | Público |
| `/auth/login` | Público |
| `/dashboard` | Usuario autenticado → redirige a login |
| `/admin/*` | Solo admin |

## Dashboard
Disponible en `/dashboard` tras iniciar sesión.
Muestra resumen de suscripción, proyectos y enlace a pagos.
