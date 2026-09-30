import { describe, it, expect } from 'vitest';
import {
  activeSpecials,
  findSpecial,
  formatExpiry,
  specials,
  type Special,
} from '@/content/specials';
import { serviceOptions } from '@/content/services';

const base: Omit<Special, 'code' | 'expires'> = {
  tag: '',
  title: '',
  price: '',
  description: '',
  finePrint: '',
  service: 'Carpet cleaning',
};
const sample: Special[] = [
  { ...base, code: 'ENDS-TODAY', expires: '2026-10-15' },
  { ...base, code: 'EXPIRED', expires: '2026-10-14' },
  { ...base, code: 'ONGOING' },
];

describe('activeSpecials', () => {
  it('keeps offers through the end of their expiry day, plus ongoing ones', () => {
    const now = new Date(2026, 9, 15, 23, 59); // Oct 15, 11:59pm local
    expect(activeSpecials(sample, now).map((s) => s.code)).toEqual(['ENDS-TODAY', 'ONGOING']);
  });

  it('drops an offer the day after it expires', () => {
    const now = new Date(2026, 9, 16, 0, 1);
    expect(activeSpecials(sample, now).map((s) => s.code)).toEqual(['ONGOING']);
  });
});

describe('findSpecial', () => {
  const now = new Date(2026, 9, 1);

  it('finds an active special by code, ignoring case', () => {
    expect(findSpecial('fresh3', now)?.code).toBe('FRESH3');
  });

  it('ignores unknown, missing and expired codes', () => {
    expect(findSpecial('NOPE', now)).toBeUndefined();
    expect(findSpecial(undefined, now)).toBeUndefined();
    expect(findSpecial('SOFA179', new Date(2026, 11, 1))).toBeUndefined(); // expired Nov 30
  });
});

describe('specials content', () => {
  it('has unique codes and services that exist on the contact form', () => {
    const codes = specials.map((s) => s.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const s of specials) {
      expect(s.code).toMatch(/^[A-Z0-9]+$/);
      expect(serviceOptions).toContain(s.service);
      if (s.expires) expect(s.expires).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe('formatExpiry', () => {
  it('formats the local date without a timezone shift', () => {
    expect(formatExpiry('2026-12-31')).toBe('December 31, 2026');
  });
});
