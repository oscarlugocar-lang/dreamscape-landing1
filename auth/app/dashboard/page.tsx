import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  if (!session?.user) redirect('/auth/login')

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      <nav style={{ padding: '16px 24px', borderBottom: '1px solid rgba(0,255,255,.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 900, background: 'linear-gradient(135deg,#00FFFF,#BF00FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>DREAMSCAPE</span>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ color: '#00FFFF', fontSize: 14 }}>{session.user.email}</span>
          <a href="/api/auth/signout" style={{ color: '#888', fontSize: 13 }}>Cerrar sesión</a>
        </div>
      </nav>
      <main style={{ maxWidth: 960, margin: '40px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: 28, color: '#00FFFF', fontFamily: 'Montserrat' }}>Panel de Control</h1>
        <p style={{ color: '#888', marginTop: 8 }}>Bienvenido, {session.user.name}.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16, marginTop: 32 }}>
          <div style={{ background: 'rgba(0,255,255,.03)', border: '1px solid rgba(0,255,255,.15)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ color: '#00FFFF', fontSize: 16 }}>Mi Suscripción</h3>
            <p style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Gestiona tu plan y facturación de Dreamscape.</p>
            <a href="https://dreamscape-payments.vercel.app/" target="_blank" style={{ display: 'inline-block', marginTop: 12, padding: '8px 20px', background: 'linear-gradient(135deg,#00FFFF,#BF00FF)', color: '#000', borderRadius: 50, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>Ir a pagos</a>
          </div>
          <div style={{ background: 'rgba(191,0,255,.03)', border: '1px solid rgba(191,0,255,.15)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ color: '#BF00FF', fontSize: 16 }}>Mis Proyectos</h3>
            <p style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Tus proyectos de edición activos.</p>
          </div>
          <div style={{ background: 'rgba(57,255,20,.03)', border: '1px solid rgba(57,255,20,.15)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ color: '#39FF14', fontSize: 16 }}>BinaryBoost Trading</h3>
            <p style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Accede a nuestra guía de trading y plataforma IQ Option.</p>
            <a href="/dreamscape-landing1/trading/" target="_blank" style={{ display: 'inline-block', marginTop: 12, padding: '8px 20px', background: '#22C55E', color: '#000', borderRadius: 50, fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>Ir a BinaryBoost →</a>
          </div>
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ color: '#A1A1AA', fontSize: 16 }}>Ayuda</h3>
            <p style={{ color: '#888', fontSize: 13, marginTop: 8 }}>Contacta con soporte o consulta la documentación.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
