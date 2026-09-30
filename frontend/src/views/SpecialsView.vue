<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue';
import { RouterLink } from 'vue-router';
import PageHero from '@/components/PageHero.vue';
import SpecialCoupon from '@/components/SpecialCoupon.vue';
import { business, phoneHref } from '@/content/business';
import { activeSpecials, commonTerms } from '@/content/specials';

const list = activeSpecials();

/** Code of the coupon being printed; the print stylesheet below hides everything else. */
const printing = ref<string | null>(null);

function clearPrint() {
  printing.value = null;
  delete document.documentElement.dataset.printCoupon;
}

async function printCoupon(code: string) {
  printing.value = code;
  document.documentElement.dataset.printCoupon = code;
  await nextTick();
  window.print();
  // Most browsers block on print(); `afterprint` covers the ones that don't.
  clearPrint();
}

window.addEventListener('afterprint', clearPrint);
onBeforeUnmount(() => {
  window.removeEventListener('afterprint', clearPrint);
  clearPrint();
});
</script>

<template>
  <div>
    <PageHero eyebrow="Specials" title="Save on your next cleaning">
      Mention the coupon code when you call, or tap <strong>Book this special</strong> and we’ll add
      it to your quote request. Prefer paper? Print any coupon and hand it to us on the day.
    </PageHero>

    <section class="container">
      <div class="specials">
        <template v-if="list.length">
          <SpecialCoupon
            v-for="s in list"
            :key="s.code"
            :special="s"
            :printing="printing === s.code"
            @print="printCoupon(s.code)"
          />
          <p class="terms">{{ commonTerms }}</p>
        </template>

        <div v-else class="card empty">
          <h2>No specials running right now</h2>
          <p class="body-copy">
            Check back soon, or call <a :href="phoneHref">{{ business.phone }}</a> and ask — we can
            usually put together a package for your rooms.
          </p>
          <RouterLink to="/services" class="btn btn-primary">See our prices</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Coupon column, left-aligned with the page title above. */
.specials {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 940px;
  padding-block: 56px 64px;
}
.terms {
  max-width: 80ch;
  font-size: 13px;
  font-style: italic;
  line-height: 1.6;
  color: var(--c-muted);
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}
.empty h2 {
  font-size: 22px;
  font-weight: 800;
}
</style>

<style>
/* Printing one coupon: hide the site chrome and every other coupon. (Global on purpose — these
   rules reach outside this view.) */
@media print {
  html[data-print-coupon] .site-header,
  html[data-print-coupon] .site-footer,
  html[data-print-coupon] .wave,
  html[data-print-coupon] .page-hero,
  html[data-print-coupon] .specials .terms,
  html[data-print-coupon] .coupon:not(.is-printing) {
    display: none !important;
  }
  /* Print on white paper even from dark mode (also backs the scissors on the cut line). Matches
     the specificity of the :root[data-theme='dark'] tokens so it wins. */
  :root[data-theme][data-print-coupon] {
    --c-paper: #fff;
    color-scheme: light;
  }
  html[data-print-coupon],
  html[data-print-coupon] body {
    background: #fff !important;
  }
  html[data-print-coupon] .specials {
    padding: 16px 0 0; /* room for the scissors above the coupon */
  }
}
</style>
