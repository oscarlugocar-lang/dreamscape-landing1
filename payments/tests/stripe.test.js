const { describe, test, expect } = require('@jest/globals');

describe('Stripe API shape', () => {
  test('checkout session shape is valid', () => {
    const session = { id: 'cs_test_xxx', mode: 'subscription', url: 'https://checkout.stripe.com/c/pay/test' };
    expect(session).toHaveProperty('id');
    expect(session.mode).toBe('subscription');
    expect(session.url).toContain('checkout.stripe.com');
  });

  test('subscription shape is valid', () => {
    const sub = { id: 'sub_test', status: 'active', items: { data: [{ price: { id: 'price_test' } }] } };
    expect(sub).toHaveProperty('id');
    expect(sub.status).toBe('active');
  });
});

describe('Stripe Webhooks', () => {
  test('event has required fields', () => {
    const event = {
      type: 'checkout.session.completed',
      data: { object: { id: 'cs_test_xxx', customer: 'cus_xxx' } },
    };
    expect(event.type).toBe('checkout.session.completed');
    expect(event.data.object.id).toMatch(/^cs_test/);
  });

  test('invoice event has id prefix', () => {
    const event = {
      type: 'invoice.paid',
      data: { object: { id: 'in_xxx', customer: 'cus_xxx' } },
    };
    expect(event.type).toBe('invoice.paid');
    expect(event.data.object.id).toMatch(/^in_/);
  });
});
