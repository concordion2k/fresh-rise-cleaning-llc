// Services and published pricing. Prices are display strings so ranges like "$250+" stay readable.

import carpetIcon from '@/assets/icon-carpet.png';
import upholsteryIcon from '@/assets/icon-upholstery.png';
import rugIcon from '@/assets/icon-rug.png';
import mattressIcon from '@/assets/icon-mattress.png';
import petIcon from '@/assets/icon-pet.png';
import peopleIcon from '@/assets/icon-people.png';

export interface ServiceSummary {
  title: string;
  body: string;
  icon: string;
}

export interface Package {
  title: string;
  price: string;
  note: string;
}

export interface PriceRow {
  label: string;
  price: string;
}

export interface PriceGroup {
  title: string;
  icon: string;
  note: string;
  rows: PriceRow[];
}

/** "What we clean" cards on the home page. */
export const services: ServiceSummary[] = [
  {
    title: 'Carpet cleaning',
    body: 'Hot water extraction for rooms, hallways, stairs and landings.',
    icon: carpetIcon,
  },
  {
    title: 'Upholstery cleaning',
    body: 'Sofas, sectionals, recliners, dining chairs and ottomans.',
    icon: upholsteryIcon,
  },
  {
    title: 'Area rug cleaning',
    body: 'On-site cleaning for synthetic rugs, priced by the square foot.',
    icon: rugIcon,
  },
  {
    title: 'Mattress cleaning',
    body: 'Twin through king, freshened and deodorized.',
    icon: mattressIcon,
  },
  {
    title: 'Pet stain & odor',
    body: 'Severity-based urine treatment that neutralizes at the source.',
    icon: petIcon,
  },
  {
    title: 'Residential & commercial',
    body: 'Homes, rentals, offices and small commercial spaces.',
    icon: peopleIcon,
  },
];

/** Options for the "Service needed" field on the contact form. */
export const serviceOptions = [
  'Carpet cleaning',
  'Upholstery cleaning',
  'Area rug cleaning',
  'Mattress cleaning',
  'Pet stain & odor treatment',
  'Not sure yet',
];

export const packages: Package[] = [
  { title: '3-room package', price: '$149', note: 'A good place to start for most homes.' },
  { title: '5-room package', price: '$239', note: 'Works out to about $48 per room.' },
  { title: 'Whole home', price: '$329', note: 'Up to 1,500 carpeted sq ft. Larger homes quoted.' },
];

export const priceGroups: PriceGroup[] = [
  {
    title: 'Carpet cleaning',
    icon: carpetIcon,
    note: 'Priced per area. Minimum service call $119.',
    rows: [
      { label: 'Standard room, up to 200 sq ft', price: '$55' },
      { label: 'Large room, 201–300 sq ft', price: '$75' },
      { label: 'XL / open room, 301–400 sq ft', price: '$100' },
      { label: 'Hallway', price: '$20' },
      { label: 'Walk-in closet', price: '$15' },
      { label: 'Stairs', price: '$4 / step' },
      { label: 'Landing', price: '$8' },
    ],
  },
  {
    title: 'Upholstery',
    icon: upholsteryIcon,
    note: 'Fabric furniture, cleaned in place.',
    rows: [
      { label: 'Dining chair', price: '$20' },
      { label: 'Ottoman', price: '$25' },
      { label: 'Throw pillow', price: '$10' },
      { label: 'Recliner', price: '$55' },
      { label: 'Loveseat', price: '$90' },
      { label: '3-seat sofa', price: '$120' },
      { label: 'Small sectional', price: '$150' },
      { label: 'Medium sectional', price: '$190' },
      { label: 'Large / U sectional', price: '$250+' },
    ],
  },
  {
    title: 'Mattresses & area rugs',
    icon: mattressIcon,
    note: 'Rug pricing is for synthetic fibers, cleaned on site.',
    rows: [
      { label: 'Twin mattress', price: '$50' },
      { label: 'Queen mattress', price: '$75' },
      { label: 'King mattress', price: '$90' },
      { label: 'Area rug, synthetic', price: '$1.00 / sq ft' },
    ],
  },
  {
    title: 'Treatments & add-ons',
    icon: petIcon,
    note: 'Optional, and always explained before we apply anything.',
    rows: [
      { label: 'Pet urine treatment', price: '$25+ / area' },
      { label: 'Carpet deodorizer', price: '$15 / room' },
      { label: 'Carpet protector', price: '$30 / room' },
      { label: 'Upholstery protector', price: '+$15–$30 / item' },
    ],
  },
];
