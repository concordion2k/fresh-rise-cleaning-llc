// The site is static (no backend), so the quote form hands off to the visitor's email app with the
// request pre-filled instead of POSTing anywhere.

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  items: string;
  notes: string;
}

const FIELDS: [keyof QuoteRequest, string][] = [
  ['name', 'Name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['location', 'City / ZIP'],
  ['service', 'Service needed'],
  ['items', 'Rooms / items'],
  ['notes', 'Notes'],
];

export function buildQuoteMailto(to: string, req: QuoteRequest): string {
  const name = req.name.trim();
  const subject = name ? `Quote request from ${name}` : 'Quote request';
  const body = FIELDS.map(([key, label]) => `${label}: ${req[key].trim() || '-'}`).join('\n');
  // encodeURIComponent (not URLSearchParams) so spaces become %20 — mail clients show "+" literally.
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
