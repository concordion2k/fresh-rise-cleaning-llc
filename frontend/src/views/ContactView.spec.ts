import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import ContactView from '@/views/ContactView.vue';
import { business } from '@/content/business';

describe('ContactView', () => {
  const realLocation = window.location;
  let location: { href: string };

  beforeEach(() => {
    // Capture the mailto: navigation instead of letting the test environment follow it.
    location = { href: '' };
    Object.defineProperty(window, 'location', { value: location, configurable: true });
    // Pin "today" so the sample specials used below are still active.
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 1));
  });
  afterEach(() => {
    Object.defineProperty(window, 'location', { value: realLocation, configurable: true });
    vi.useRealTimers();
  });

  it('opens a pre-filled email to the business on submit', async () => {
    const wrapper = mount(ContactView, { global: { stubs: { RouterLink: RouterLinkStub } } });
    await wrapper.find('input[autocomplete="name"]').setValue('Ana Silva');
    await wrapper.find('input[type="tel"]').setValue('555-0100');
    await wrapper.find('select').setValue('Upholstery cleaning');
    await wrapper.find('form').trigger('submit');

    expect(location.href.startsWith(`mailto:${business.email}?`)).toBe(true);
    const body = decodeURIComponent(location.href.split('body=')[1] ?? '');
    expect(body).toContain('Name: Ana Silva');
    expect(body).toContain('Phone: 555-0100');
    expect(body).toContain('Service needed: Upholstery cleaning');
    expect(wrapper.find('.status').text()).toContain('Your email app should open');
  });

  it('pre-fills the service and notes from a special booked on the Specials page', async () => {
    const wrapper = mount(ContactView, {
      props: { special: 'sofa179' },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect((wrapper.find('select').element as HTMLSelectElement).value).toBe('Upholstery cleaning');
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toContain(
      'code SOFA179',
    );
    expect(wrapper.find('.applied').text()).toContain('SOFA179');
  });

  it('ignores an unknown special code', () => {
    const wrapper = mount(ContactView, {
      props: { special: 'BOGUS' },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.find('.applied').exists()).toBe(false);
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('');
  });
});
