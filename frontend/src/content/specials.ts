// Current coupons for the Specials page. These are sample offers priced against the published rates
// in services.ts — replace them with real ones before launch. A special disappears from the site
// automatically the day after its `expires` date.

export interface Special {
  /** Coupon code the customer mentions when booking. Also used in the page URL. */
  code: string;
  /** Short label above the offer, e.g. who it's for. */
  tag: string;
  title: string;
  /** The headline number, e.g. "$129", "FREE" or "$20 off". */
  price: string;
  /** Regular price, shown struck through. */
  regular?: string;
  /** Small line under the price when it needs context. */
  priceNote?: string;
  description: string;
  finePrint: string;
  /** Last valid day, as YYYY-MM-DD (local time). Omit for an ongoing offer. */
  expires?: string;
  /** Contact-form service to pre-select when someone books this special. */
  service: string;
}

/** Terms that apply to every coupon, shown once below them. */
export const commonTerms =
  'Mention the coupon code when you book. One coupon per visit, and coupons can’t be combined with other offers. Minimum service call of $119 applies. Residential customers in our service area only. Offers and prices may change.';

export const specials: Special[] = [
  {
    code: 'FRESH3',
    tag: 'New customers',
    title: '3 rooms of carpet cleaned',
    price: '$129',
    regular: '$149',
    description:
      'Our 3-room package, discounted for your first cleaning. Every room gets pre-treatment, hot water extraction and grooming.',
    finePrint:
      'First-time customers only. Rooms up to 200 sq ft each; larger rooms count as two. Hallways and stairs priced separately.',
    expires: '2026-12-31',
    service: 'Carpet cleaning',
  },
  {
    code: 'SOFA179',
    tag: 'Upholstery',
    title: 'Sofa + loveseat',
    price: '$179',
    regular: '$210',
    description:
      'Freshen the two pieces that get the most use. Cleaned in place, with spots pre-treated and fabric groomed to dry evenly.',
    finePrint:
      'Standard 3-seat sofa and loveseat in fabric. Excludes sectionals and leather. Up to 6 throw pillows included.',
    expires: '2026-11-30',
    service: 'Upholstery cleaning',
  },
  {
    code: 'FRESHAIR',
    tag: 'Whole home',
    title: 'Free carpet deodorizer',
    price: 'FREE',
    priceNote: 'with the $329 whole-home package',
    description:
      'Book a whole-home cleaning (up to 1,500 carpeted sq ft) and we’ll deodorize every room at no charge — up to a $75 value.',
    finePrint: 'Whole-home package only. Deodorizer applied to up to 5 rooms.',
    expires: '2026-12-31',
    service: 'Carpet cleaning',
  },
  {
    code: 'NEIGHBOR20',
    tag: 'Referral',
    title: 'Refer a neighbor',
    price: '$20 off',
    priceNote: 'for you and your neighbor',
    description:
      'Most of our work comes from neighbors telling neighbors. When someone you refer books their first cleaning, you both save $20.',
    finePrint:
      'Your neighbor mentions your name and this code when booking. Your $20 credit applies to your next cleaning. No limit on referrals.',
    service: 'Not sure yet',
  },
];

/** Today's date as YYYY-MM-DD in the visitor's local time (so offers end at local midnight). */
function localToday(now: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Specials that haven't expired yet. */
export function activeSpecials(list: Special[] = specials, now = new Date()): Special[] {
  const today = localToday(now);
  return list.filter((s) => !s.expires || s.expires >= today);
}

/** Looks up an active special by its code (case-insensitive). */
export function findSpecial(code: string | undefined, now = new Date()): Special | undefined {
  if (!code) return undefined;
  const wanted = code.toUpperCase();
  return activeSpecials(specials, now).find((s) => s.code === wanted);
}

/** "December 31, 2026" for display. */
export function formatExpiry(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y!, m! - 1, d!).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
