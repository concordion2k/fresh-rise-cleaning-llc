// ---------------------------------------------------------------------------
// Privacy Policy copy. A plain-language starting template modeled on what
// residential cleaning companies publish, written to match how this site and
// business actually work (static site, no analytics, mailto quote form, texts
// with customers). It is not legal advice — have a professional review it.
//
// Keep it truthful: if the business starts using analytics, ad pixels, online
// booking, a CRM or marketing texts/emails, update the matching sections and
// `lastUpdated`. The FTC treats a policy that doesn't match practice as
// deceptive.
// ---------------------------------------------------------------------------

import { business, emailHref, phoneHref } from '@/content/business';
import type { Rich } from '@/content/rich';

export const lastUpdated = 'September 27, 2026';

export type Block = { p: Rich } | { list: Rich[] } | { h3: string };

export interface PolicySection {
  id: string;
  title: string;
  body: Block[];
}

const email = { text: business.email, href: emailHref };
const phone = { text: business.phone, href: phoneHref };
const googlePrivacy = {
  text: 'Google’s Privacy Policy',
  href: 'https://policies.google.com/privacy',
};

/** Short plain-language summary shown above the full policy. */
export const summary = [
  'We collect only what we need to quote, schedule and do your cleaning.',
  'We never sell or rent your information, and we don’t share it for anyone else’s marketing.',
  'Our website doesn’t use analytics, advertising pixels or tracking cookies.',
  'You can ask us to see, correct or delete your information at any time.',
];

export const sections: PolicySection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: [
      {
        p: `${business.legalName} ("${business.name}", "we", "us") is a family owned carpet, upholstery and area rug cleaning company serving the ${business.serviceArea} area.`,
      },
      {
        p: 'This policy explains what personal information we collect, how we use it, and the choices you have. It covers this website and the information you share with us when you ask for a quote or book a cleaning — whether that’s by phone, text, email or in person.',
      },
    ],
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    body: [
      { h3: 'Information you give us' },
      {
        list: [
          'Your name, phone number and email address.',
          'The address where you’d like the service, or your city and ZIP code for a quote.',
          'Details about the job, such as the rooms, furniture, rugs or mattresses to be cleaned, stains or pet areas, stairs, and the days that work for you.',
          'Access instructions you choose to share, such as a gate code, lockbox code or parking notes.',
          'Photos you send us of the areas you’d like cleaned, and anything else you write in your messages to us.',
        ],
      },
      { h3: 'Information we create while working with you' },
      {
        list: [
          'Quotes, appointment details, invoices and payment records.',
          'Job notes, such as the fiber type, the stains we treated, and any protector or deodorizer applied.',
          'Before-and-after photos of the carpet, upholstery or rugs we clean.',
        ],
      },
      { h3: 'Payment information' },
      {
        p: 'If you pay by card or through a payment app, your payment details go to that payment provider. We see only limited information, such as your name, the amount and the last four digits of a card, and we never store full card numbers.',
      },
      { h3: 'Information collected when you visit this website' },
      {
        p: 'This website does not use analytics, advertising pixels or tracking cookies, and it has no accounts or logins. It does remember whether you prefer the light or dark theme; that setting is stored only in your browser and is never sent to us.',
      },
      {
        p: 'Like any website, the servers that deliver it receive standard technical information, such as your IP address, browser type and the page requested. Our hosting provider, Amazon Web Services, processes this information to deliver and protect the site.',
      },
    ],
  },
  {
    id: 'third-party-content',
    title: 'Google Fonts and Google Maps',
    body: [
      {
        p: 'Our pages load their typeface from Google Fonts, and the Contact page shows an embedded Google Map of our service area. To provide these, Google receives your IP address and basic browser information, and the map may set cookies of its own.',
      },
      { p: ['Google handles that information under ', googlePrivacy, ', not ours.'] },
    ],
  },
  {
    id: 'quote-form',
    title: 'Our quote request form',
    body: [
      {
        p: 'The form on our Contact page doesn’t send your details to us or store them anywhere. When you press "Send my request", it opens your own email app with a message already filled in. Nothing reaches us unless you choose to send that email.',
      },
      {
        p: 'Once you send it, we receive it like any other email and handle it as described in this policy.',
      },
    ],
  },
  {
    id: 'how-we-use-it',
    title: 'How we use your information',
    body: [
      {
        list: [
          'To answer your questions and prepare your quote.',
          'To schedule your appointment and send confirmations, reminders and arrival updates.',
          'To do the job — find your home, get in, and clean what you asked us to.',
          'To follow up after the job and handle any concerns or re-cleans.',
          'To take payment and keep the business, tax and accounting records we’re required to keep.',
          'To improve our service.',
          'To send occasional offers or seasonal reminders, but only if you’ve agreed to receive them. You can opt out at any time.',
          'To protect our customers, our business and ourselves, and to meet legal obligations.',
        ],
      },
    ],
  },
  {
    id: 'photos',
    title: 'Photos',
    body: [
      {
        p: 'We take before-and-after photos to document our work and to answer questions about a job later. We only post photos from your home on our website or social media with your permission, and never in a way that shows your address, your family or other personal details.',
      },
    ],
  },
  {
    id: 'text-messages',
    title: 'Text messages',
    body: [
      {
        p: 'If you give us your mobile number, we may text you about your quote, appointment confirmations and reminders, arrival updates, and follow-ups after the job. We send promotional texts only if you’ve specifically agreed to receive them.',
      },
      {
        p: 'Message frequency varies, and message and data rates may apply. Reply STOP to any message to stop receiving texts, or HELP for help.',
      },
      {
        p: 'We do not share your mobile number, text messaging opt-in data or consent with third parties or affiliates for their marketing or promotional purposes. Opt-in data and consent are never shared with anyone except the phone and messaging providers that deliver our texts on our behalf.',
      },
    ],
  },
  {
    id: 'sharing',
    title: 'When we share information',
    body: [
      {
        p: 'We do not sell or rent your personal information, and we don’t share it with advertisers or data brokers. We share it only when we need to:',
      },
      {
        list: [
          'With service providers that help us run the business, such as our phone and texting service, email, payment processing, scheduling or accounting software, and website hosting. They get only what they need to do that work for us.',
          'With professional advisers, such as our accountant, insurer or attorney, when needed — for example, to handle a claim.',
          'When the law requires it, or when needed to protect someone’s safety, our rights or our property.',
          'If the business is ever sold or merged, as part of that transfer.',
        ],
      },
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: [
      {
        p: 'We keep your information as long as we need it to serve you and to follow up on our work. Invoices and payment records are kept for as long as tax and business laws require.',
      },
      {
        p: 'Access codes and similar instructions are kept only as long as we need them for your appointments. You can ask us to delete your information at any time; we’ll do so unless the law requires us to keep it.',
      },
    ],
  },
  {
    id: 'security',
    title: 'How we protect it',
    body: [
      {
        p: 'We use reasonable safeguards to protect your information. Our devices and accounts are password protected, access is limited to us and the service providers who need it, and we never ask for sensitive information such as your Social Security number.',
      },
      {
        p: 'No method of storing or sending information is completely secure. If a security breach ever affects your personal information, we will notify you as required by Florida law.',
      },
    ],
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    body: [
      { p: 'You can ask us at any time to:' },
      {
        list: [
          'Tell you what personal information we have about you.',
          'Correct information that’s wrong or out of date.',
          'Delete your information, unless we’re required to keep it.',
          'Stop sending you promotional texts or emails.',
          'Stop using photos of your home, if you gave us permission to post them.',
        ],
      },
      {
        p: [
          'Just call or text ',
          phone,
          ' or email ',
          email,
          '. We may need to confirm it’s you before making changes, and we’ll respond within 30 days.',
        ],
      },
    ],
  },
  {
    id: 'children',
    title: 'Children’s privacy',
    body: [
      {
        p: [
          'Our website and services are meant for adults and aren’t directed to children under 13. We don’t knowingly collect personal information from children. If you believe a child has sent us information, ',
          { text: 'contact us', to: '/contact' },
          ' and we’ll delete it.',
        ],
      },
    ],
  },
  {
    id: 'other-sites',
    title: 'Links to other websites',
    body: [
      {
        p: 'Our site may link to other websites, such as Google Maps. We aren’t responsible for their privacy practices, so please review their policies.',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: [
      {
        p: 'We may update this policy as our business grows, for example if we start offering online booking. When we do, we’ll post the new version here and change the "Last updated" date at the top.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: [
      { p: 'Questions about this policy or your information? Get in touch:' },
      {
        list: [
          business.legalName,
          ['Phone or text: ', phone],
          ['Email: ', email],
          `Serving the ${business.serviceArea} area`,
        ],
      },
    ],
  },
];
