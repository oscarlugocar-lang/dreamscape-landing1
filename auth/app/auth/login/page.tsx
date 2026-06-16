'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Iniciar Sesión</h1>

      <button onClick={() => signIn('github', { callbackUrl: '/' })}
        style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: 'none', background: '#333', color: '#fff', cursor: 'pointer' }}>
        Continuar con GitHub
      </button>

      <button onClick={() => signIn('google', { callbackUrl: '/' })}
        style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: 'none', background: '#4285f4', color: '#fff', cursor: 'pointer' }}>
        Continuar con Google
      </button>

      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #333' }} />

      <input
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #333', background: '#111', color: '#fff', marginBottom: 12 }}
      />
      <button onClick={() => signIn('email', { email, callbackUrl: '/' })}
        style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer' }}>
        Enviar Magic Link
      </button>
    </div>
  );
}
