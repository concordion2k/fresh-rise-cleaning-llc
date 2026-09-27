import { describe, it, expect } from 'vitest';
import { buildQuoteMailto, type QuoteRequest } from '@/utils/mailto';

const blank: QuoteRequest = {
  name: '',
  phone: '',
  email: '',
  location: '',
  service: '',
  items: '',
  notes: '',
};

function parse(href: string) {
  const [addr, query] = href.replace(/^mailto:/, '').split('?');
  const params = Object.fromEntries(
    (query ?? '').split('&').map((kv) => {
      const [k, v] = kv.split('=');
      return [k, decodeURIComponent(v ?? '')];
    }),
  );
  return { addr, ...params };
}

describe('buildQuoteMailto', () => {
  it('addresses the business and names the sender in the subject', () => {
    const href = buildQuoteMailto('owner@example.com', { ...blank, name: '  Ana Silva ' });
    const { addr, subject } = parse(href);
    expect(addr).toBe('owner@example.com');
    expect(subject).toBe('Quote request from Ana Silva');
  });

  it('lists every field in the body, with a dash for blanks', () => {
    const href = buildQuoteMailto('owner@example.com', {
      ...blank,
      name: 'Ana',
      phone: '555-0100',
      service: 'Carpet cleaning',
      notes: 'Two dogs\nStairs too',
    });
    const { body } = parse(href);
    expect(body).toBe(
      [
        'Name: Ana',
        'Phone: 555-0100',
        'Email: -',
        'City / ZIP: -',
        'Service needed: Carpet cleaning',
        'Rooms / items: -',
        'Notes: Two dogs\nStairs too',
      ].join('\n'),
    );
  });

  it('percent-encodes spaces and reserved characters (no "+" for spaces)', () => {
    const href = buildQuoteMailto('owner@example.com', { ...blank, name: 'A & B' });
    expect(href).toContain('subject=Quote%20request%20from%20A%20%26%20B');
    expect(href).not.toContain('+');
  });
});
