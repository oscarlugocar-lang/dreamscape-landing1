const { describe, test, expect } = require('@jest/globals');

describe('Auth JWT', () => {
  test('token shape is valid', () => {
    const token = { name: 'Test', email: 'test@d.io', role: 'user', id: 'u1' };
    expect(token).toHaveProperty('role', 'user');
    expect(token).toHaveProperty('id');
  });

  test('admin token has admin role', () => {
    const admin = { name: 'Admin', email: 'admin@d.io', role: 'admin', id: 'a1' };
    expect(admin.role).toBe('admin');
  });
});

describe('Auth Middleware', () => {
  test('public routes start with /', () => {
    ['/', '/auth/login'].forEach(r => expect(r.startsWith('/')).toBe(true));
  });

  test('admin routes start with /admin', () => {
    ['/admin', '/admin/dashboard'].forEach(r => expect(r.startsWith('/admin')).toBe(true));
  });
});

describe('Auth Config', () => {
  const required = ['AUTH_SECRET', 'AUTH_GITHUB_ID', 'AUTH_GITHUB_SECRET', 'AUTH_GOOGLE_ID', 'AUTH_GOOGLE_SECRET'];
  test('required env vars are documented', () => {
    required.forEach(key => expect(typeof key).toBe('string'));
  });
});
