# Auth Setup — Dreamscape

## Providers disponibles
- **GitHub** — OAuth rápido para developers
- **Google** — OAuth masivo para usuarios generales
- **Email** — Magic links (sin password)

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
| `/dashboard` | Usuario autenticado |
| `/admin/*` | Solo admin |
