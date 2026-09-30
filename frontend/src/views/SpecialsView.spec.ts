import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import SpecialsView from '@/views/SpecialsView.vue';
import { specials } from '@/content/specials';

function render() {
  return mount(SpecialsView, { global: { stubs: { RouterLink: RouterLinkStub } } });
}

describe('SpecialsView', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('shows every active coupon, each linking to the contact form with its code', () => {
    vi.setSystemTime(new Date(2026, 9, 1));
    const wrapper = render();
    const coupons = wrapper.findAll('article.coupon');
    expect(coupons).toHaveLength(specials.length);

    const links = wrapper
      .findAllComponents(RouterLinkStub)
      .filter((l) => l.text() === 'Book this special');
    expect(links.map((l) => l.props('to'))).toEqual(
      specials.map((s) => ({ name: 'contact', query: { special: s.code } })),
    );
  });

  it('hides expired coupons', () => {
    vi.setSystemTime(new Date(2026, 11, 15)); // after SOFA179 (Nov 30), before the Dec 31 ones
    const codes = render()
      .findAll('article.coupon .code')
      .map((c) => c.text());
    expect(codes).not.toContain('SOFA179');
    expect(codes).toContain('NEIGHBOR20'); // ongoing
  });

  it('keeps ongoing offers after every dated one has expired', () => {
    vi.setSystemTime(new Date(2030, 0, 1));
    const ongoing = specials.filter((s) => !s.expires);
    expect(render().findAll('article.coupon')).toHaveLength(ongoing.length);
  });

  it('prints only the chosen coupon, then clears the print state', async () => {
    vi.setSystemTime(new Date(2026, 9, 1));
    let duringPrint: { attr?: string; marked: string[] } | undefined;
    const wrapper = render();
    // happy-dom has no window.print; stand in for the browser's print dialog.
    const print = vi.fn(() => {
      duringPrint = {
        attr: document.documentElement.dataset.printCoupon,
        marked: wrapper.findAll('.coupon.is-printing').map((c) => c.attributes('id') ?? ''),
      };
    });
    vi.stubGlobal('print', print);

    const target = wrapper.findAll('article.coupon')[1]!;
    await target.find('button').trigger('click');

    expect(print).toHaveBeenCalledOnce();
    expect(duringPrint).toEqual({
      attr: specials[1]!.code,
      marked: [`special-${specials[1]!.code}`],
    });
    expect(document.documentElement.dataset.printCoupon).toBeUndefined();
    expect(wrapper.findAll('.coupon.is-printing')).toHaveLength(0);
  });
});
