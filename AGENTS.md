# Dreamscape Landing Page

## Project
Landing page for Dreamscape (IA para Edición de Video Profesional).
Hostinger-style design, deployed to GitHub Pages.

## Commands
- `npm run dev` — Start auth/payments dev servers (inside auth/ or payments/)
- `pnpm dev` — Alt dev command
- Deploy: Push to `main` triggers GitHub Actions

## Stack
- Landing: HTML + CSS + vanilla JS
- Auth: NextAuth.js + Prisma
- Payments: Stripe + Express + Prisma
- Infra: Terraform + shell scripts
- CI: GitHub Actions (deploy.yml + quality.yml)

## Colors (Dreamstartup Design System)
- --bg-primary: #0a0a0f
- --bg-card: #1a1a2e
- --accent-violet: #8b5cf6
- --accent-cyan: #06b6d4
- --accent-green: #22c55e
- --gradient-accent: linear-gradient(135deg, #8b5cf6, #06b6d4)
- --text-primary: #f8fafc
- --text-secondary: #94a3b8
- --border: #1e293b

## Trading Page
- `trading/index.html` — BinaryBoost landing page (matching Dreamstartup aesthetic)
- `trading/privacy.html` — Privacy policy
- `trading/terms.html` — Terms & conditions
- All three use the same violet/cyan design tokens above

## Notes
- The site lives at: https://oscarlugocar-lang.github.io/dreamscape-landing1/
- All content is in Spanish
- Both Cursor and Antigravity IDE can open this project
