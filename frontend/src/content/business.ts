// Single source of truth for the business's contact details. Update here and every page follows.

export const business = {
  name: 'FreshRise Cleaning',
  legalName: 'FreshRise Cleaning, LLC',
  tagline: 'Cleaner spaces. Happier homes.',
  serviceArea: 'Four Corners, FL',
  phone: '555-555-1234',
  email: 'support@freshrisecleaning.com',
  hours: 'Monday – Saturday, 8am – 6pm',
  hoursShort: 'Mon–Sat, 8am–6pm',
  minimumCall: '$119',
} as const;

/** `tel:` href for the business phone (digits only). */
export const phoneHref = `tel:${business.phone.replace(/\D/g, '')}`;

/** Plain `mailto:` href for the business email. */
export const emailHref = `mailto:${business.email}`;
