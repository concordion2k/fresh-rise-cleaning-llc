<script setup lang="ts">
// A clip-out coupon: dashed "cut here" border with scissors, the offer on the left and a tear-off
// stub (logo, code, barcode, actions) on the right. Follows the site theme on screen, and always
// prints in light "paper" colors.
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { formatExpiry, type Special } from '@/content/specials';
import logo from '@/assets/logo-tagline.png';
import logoDark from '@/assets/logo-tagline-dark.png';

const props = defineProps<{
  special: Special;
  /** True while this coupon is the one being printed. */
  printing?: boolean;
}>();

defineEmits<{ print: [] }>();

/** Decorative barcode: bar widths derived from the code, so each coupon's is unique and stable. */
const bars = computed(() =>
  [...`*${props.special.code}*`].flatMap((ch) => {
    const n = ch.charCodeAt(0);
    return [1 + (n % 3), 1 + ((n >> 2) % 2), 1 + ((n >> 3) % 3)];
  }),
);
</script>

<template>
  <article
    :id="`special-${special.code}`"
    class="coupon"
    :class="{ 'is-printing': printing }"
    :aria-labelledby="`special-${special.code}-title`"
  >
    <svg class="scissors" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
    </svg>

    <div class="main">
      <p class="tag">{{ special.tag }}</p>
      <h2 :id="`special-${special.code}-title`">{{ special.title }}</h2>
      <p class="price-row">
        <span class="price">{{ special.price }}</span>
        <s v-if="special.regular" class="regular">
          <span class="sr-only">Regularly </span>{{ special.regular }}
        </s>
      </p>
      <p v-if="special.priceNote" class="price-note">{{ special.priceNote }}</p>
      <p class="description">{{ special.description }}</p>
      <p class="fine-print">{{ special.finePrint }}</p>
      <p class="expires">
        {{ special.expires ? `Offer expires ${formatExpiry(special.expires)}` : 'Ongoing offer' }}
      </p>
    </div>

    <div class="stub">
      <!-- Both logos render; CSS picks one per theme (and always the light one on paper). -->
      <img :src="logo" alt="FreshRise Cleaning" class="logo logo-light" width="130" height="46" />
      <img :src="logoDark" alt="" class="logo logo-dark" width="130" height="46" />
      <p class="code-label">Coupon code</p>
      <p class="code">{{ special.code }}</p>
      <div class="barcode" aria-hidden="true">
        <span
          v-for="(w, i) in bars"
          :key="i"
          :style="{ width: `${w * 1.5}px`, opacity: i % 2 ? 0 : 1 }"
        ></span>
      </div>
      <div class="actions">
        <RouterLink
          :to="{ name: 'contact', query: { special: special.code } }"
          class="btn btn-primary btn-sm"
          >Book this special</RouterLink
        >
        <button type="button" class="btn btn-outline btn-sm" @click="$emit('print')">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
            />
            <path d="M6 14h12v8H6z" />
          </svg>
          Print
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.coupon {
  --coupon-bg: var(--c-card);
  --coupon-line: #aebaa9;
  --tag-bg: rgba(247, 147, 30, 0.14);
  --tag-ink: #a85a00;

  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 250px;
  border: 2px dashed var(--coupon-line);
  border-radius: var(--radius);
  background: var(--coupon-bg);
  color: var(--c-ink);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
:root[data-theme='dark'] .coupon {
  --coupon-line: #52675a;
  --tag-bg: rgba(247, 147, 30, 0.16);
  --tag-ink: #ffb45c;
}

/* Scissors sitting on the cut line. The backing (page color above the line, coupon color below)
   "breaks" the dashes behind it. */
.scissors {
  position: absolute;
  top: -13px;
  left: 30px;
  width: 24px;
  height: 24px;
  padding: 0 4px;
  box-sizing: content-box;
  background: linear-gradient(var(--c-paper) 50%, var(--coupon-bg) 50%);
  fill: none;
  stroke: var(--c-muted);
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.main {
  padding: 30px 32px 26px;
}
.tag {
  display: inline-block;
  margin-bottom: 12px;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--tag-bg);
  color: var(--tag-ink);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
h2 {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--c-green-text);
}
.price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 6px;
}
.price {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--c-orange);
}
.regular {
  font-size: 18px;
  font-weight: 600;
  color: var(--c-muted);
}
.price-note {
  font-size: 14px;
  font-weight: 600;
  color: var(--c-ink-soft);
}
.description {
  margin-top: 14px;
  max-width: 52ch;
  font-size: 15px;
  line-height: 1.6;
  color: var(--c-ink-soft);
}
.fine-print {
  margin-top: 14px;
  max-width: 60ch;
  font-size: 12px;
  font-style: italic;
  line-height: 1.55;
  color: var(--c-muted);
}
.expires {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--c-ink);
}

/* Tear-off stub. */
.stub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 26px 22px;
  border-left: 2px dashed var(--coupon-line);
  text-align: center;
}
.logo {
  width: 130px;
  height: auto;
  margin-bottom: 8px;
}
.logo-dark {
  display: none;
}
:root[data-theme='dark'] .logo-light {
  display: none;
}
:root[data-theme='dark'] .logo-dark {
  display: block;
}
.code-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-muted);
}
.code {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--c-ink);
}
.barcode {
  display: flex;
  height: 38px;
  margin: 4px 0 10px;
}
.barcode span {
  display: block;
  background: var(--c-ink);
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.btn-sm {
  padding: 10px 16px;
  font-size: 14px;
}
.actions svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 720px) {
  .coupon {
    grid-template-columns: minmax(0, 1fr);
  }
  .main {
    padding: 28px 22px 22px;
  }
  .stub {
    border-left: 0;
    border-top: 2px dashed var(--coupon-line);
  }
  .actions {
    max-width: 320px;
  }
}

@media print {
  /* Always light paper, whatever the screen theme. (Selectors match the dark-theme rules'
     specificity and come later, so they win.) */
  :root[data-theme] .coupon {
    --c-ink: #1e2b22;
    --c-ink-soft: #3d4a40;
    --c-muted: #6b7a6e;
    --c-green-text: #0f6b3a;
    --coupon-bg: #fffefa;
    --coupon-line: #aebaa9;
    --tag-bg: rgba(247, 147, 30, 0.14);
    --tag-ink: #a85a00;

    grid-template-columns: minmax(0, 1fr) 230px;
    break-inside: avoid;
  }
  :root[data-theme] .logo-light {
    display: block;
  }
  :root[data-theme] .logo-dark {
    display: none;
  }
  .actions {
    display: none;
  }
}
</style>
