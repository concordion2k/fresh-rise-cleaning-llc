<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PageHero from '@/components/PageHero.vue';
import CtaBand from '@/components/CtaBand.vue';
import { business } from '@/content/business';
import { packages, priceGroups } from '@/content/services';
</script>

<template>
  <div>
    <PageHero
      eyebrow="Services & pricing"
      title="Clear prices, by the room or by the piece"
      :title-width="24"
    >
      Minimum service call is <strong>{{ business.minimumCall }}</strong
      >. Everything below is quoted before we start, and we will confirm the total with you on site.
    </PageHero>

    <section class="container packages-section">
      <h2 class="section-title">Packages</h2>
      <p class="section-lede">The simplest way to book multiple rooms.</p>
      <div class="grid-auto" style="--min: 250px">
        <div v-for="p in packages" :key="p.title" class="card package">
          <h3>{{ p.title }}</h3>
          <p class="package-price">{{ p.price }}</p>
          <p class="body-copy">{{ p.note }}</p>
        </div>
      </div>
    </section>

    <section class="container price-groups grid-auto" style="--min: 320px">
      <div v-for="g in priceGroups" :key="g.title" class="card price-group">
        <img :src="g.icon" alt="" class="group-icon" />
        <h2>{{ g.title }}</h2>
        <p class="group-note">{{ g.note }}</p>
        <dl>
          <div v-for="r in g.rows" :key="r.label" class="price-row">
            <dt>{{ r.label }}</dt>
            <dd>{{ r.price }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="band notes">
      <div class="container section">
        <div class="grid-auto" style="--min: 260px">
          <div>
            <h3 class="card-title">Larger homes</h3>
            <p class="body-copy">
              Whole-home pricing covers up to 1,500 carpeted square feet. Anything larger we quote
              after a quick look at the floor plan.
            </p>
          </div>
          <div>
            <h3 class="card-title">Pet treatment</h3>
            <p class="body-copy">
              Urine treatment is priced by severity, starting at $25 per affected area. We identify
              the areas with you first.
            </p>
          </div>
          <div>
            <h3 class="card-title">Wool and specialty rugs</h3>
            <p class="body-copy">
              Listed rug pricing is for synthetic fibers cleaned on site. Ask us about wool, silk
              and hand-knotted rugs.
            </p>
          </div>
        </div>
        <CtaBand
          title="Not sure which package fits? Send us your rooms and we will price it out."
          :title-width="32"
          class="cta"
        >
          <RouterLink to="/contact" class="btn btn-accent">Request a quote</RouterLink>
        </CtaBand>
      </div>
    </section>
  </div>
</template>

<style scoped>
.packages-section {
  padding-block: 56px 20px;
}
.section-lede {
  margin-bottom: 26px;
  font-size: 16px;
}
.package {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
}
.package h3 {
  font-size: 19px;
  font-weight: 700;
}
.package-price {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--c-orange);
}

.price-groups {
  gap: 24px;
  padding-block: 36px 64px;
}
.price-group {
  padding: 30px 30px 14px;
}
.group-icon {
  display: block;
  width: 64px;
  height: 64px;
  margin-bottom: 12px;
  object-fit: contain;
}
.price-group h2 {
  margin-bottom: 4px;
  font-size: 21px;
  font-weight: 800;
}
.group-note {
  margin-bottom: 18px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--c-muted);
}
dl {
  margin: 0;
}
.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 0;
  border-top: 1px solid var(--c-line-soft);
}
dt {
  font-size: 15px;
  line-height: 1.45;
  color: var(--c-ink);
}
dd {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--c-green);
  white-space: nowrap;
}

.notes {
  border-bottom: 0;
}
.notes .grid-auto {
  gap: 28px;
}
.cta {
  margin-top: 44px;
}
</style>
