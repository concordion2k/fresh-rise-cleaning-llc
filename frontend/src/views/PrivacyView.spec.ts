import { describe, it, expect } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import PrivacyView from '@/views/PrivacyView.vue';
import { business } from '@/content/business';
import { sections } from '@/content/privacy';

function render() {
  return mount(PrivacyView, { global: { stubs: { RouterLink: RouterLinkStub } } });
}

describe('PrivacyView', () => {
  it('links every contents entry to a section on the page', () => {
    const wrapper = render();
    const hrefs = wrapper.findAll('.toc a').map((a) => a.attributes('href'));
    expect(hrefs).toEqual(sections.map((s) => `#${s.id}`));
    for (const s of sections) expect(wrapper.find(`section#${s.id}`).exists()).toBe(true);
  });

  it('shows the business contact details from business.ts', () => {
    const wrapper = render();
    const contact = wrapper.find('section#contact');
    expect(contact.text()).toContain(business.legalName);
    expect(contact.find(`a[href="mailto:${business.email}"]`).exists()).toBe(true);
    expect(contact.find('a[href^="tel:"]').exists()).toBe(true);
  });

  it('opens external links in a new tab without leaking the opener', () => {
    const external = render().findAll('a[href^="https:"]');
    expect(external.length).toBeGreaterThan(0);
    for (const a of external) {
      expect(a.attributes('target')).toBe('_blank');
      expect(a.attributes('rel')).toBe('noopener');
    }
  });
});
