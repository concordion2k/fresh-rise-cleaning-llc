import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactView from '@/views/ContactView.vue';
import { business } from '@/content/business';

describe('ContactView', () => {
  const realLocation = window.location;
  let location: { href: string };

  beforeEach(() => {
    // Capture the mailto: navigation instead of letting the test environment follow it.
    location = { href: '' };
    Object.defineProperty(window, 'location', { value: location, configurable: true });
  });
  afterEach(() => {
    Object.defineProperty(window, 'location', { value: realLocation, configurable: true });
  });

  it('opens a pre-filled email to the business on submit', async () => {
    const wrapper = mount(ContactView);
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
});
