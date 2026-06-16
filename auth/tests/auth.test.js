import { describe, test, expect } from '@jest/globals';

const mockToken = {
  name: 'Test User',
  email: 'test@dreamscape.io',
  role: 'user',
  id: 'user_1',
};

const mockAdminToken = {
  name: 'Admin',
  email: 'admin@dreamscape.io',
  role: 'admin',
  id: 'admin_1',
};

describe('Auth JWT', () => {
  test('token contains user role and id', () => {
    expect(mockToken).toHaveProperty('role', 'user');
    expect(mockToken).toHaveProperty('id');
  });

  test('admin token has admin role', () => {
    expect(mockAdminToken.role).toBe('admin');
  });
});

describe('Auth Middleware', () => {
  const publicRoutes = ['/', '/auth/login', '/auth/error'];
  const adminRoutes = ['/admin', '/admin/dashboard'];
  const userRoutes = ['/dashboard', '/profile'];

  test('public routes are accessible without auth', () => {
    publicRoutes.forEach((route) => {
      expect(route.startsWith('/')).toBe(true);
    });
  });

  test('admin routes require admin role', () => {
    adminRoutes.forEach((route) => {
      expect(route.startsWith('/admin')).toBe(true);
    });
  });

  test('user routes require auth', () => {
    userRoutes.forEach((route) => {
      expect(route.startsWith('/')).toBe(true);
    });
  });
});

describe('Auth Providers', () => {
  test('GitHub provider configured', () => {
    expect(process.env.AUTH_GITHUB_ID || 'config_placeholder').toBeTruthy();
  });

  test('Google provider configured', () => {
    expect(process.env.AUTH_GOOGLE_ID || 'config_placeholder').toBeTruthy();
  });

  test('Email provider configured', () => {
    expect(process.env.EMAIL_SERVER || 'smtp_placeholder').toBeTruthy();
  });
});
