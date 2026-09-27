<script setup lang="ts">
import { RouterLink } from 'vue-router';
import FeatureCard from '@/components/FeatureCard.vue';
import ImagePlaceholder from '@/components/ImagePlaceholder.vue';
import { business } from '@/content/business';
import { services } from '@/content/services';
import leafIcon from '@/assets/icon-leaf.png';
import shieldIcon from '@/assets/icon-shield.png';
import sparkleIcon from '@/assets/icon-sparkle.png';
</script>

<template>
  <div>
    <section class="band hero">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">Carpet &middot; Upholstery &middot; Area Rugs</p>
          <h1>A Brighter<br />Clean Starts Here</h1>
          <div class="rule"></div>
          <p class="lede">
            Professional carpet and upholstery cleaning for a fresher, healthier home. Family owned
            and serving the {{ business.serviceArea }} area.
          </p>
          <div class="actions">
            <RouterLink to="/contact" class="btn btn-primary">Request a free quote</RouterLink>
            <RouterLink to="/services" class="btn btn-outline">See pricing</RouterLink>
          </div>
        </div>
        <ImagePlaceholder
          label="hero photo — bright, sunlit living room with clean carpet"
          class="hero-photo"
        />
      </div>
    </section>

    <section class="container section">
      <div class="grid-auto">
        <FeatureCard :icon="leafIcon" title="Eco-friendly solutions">
          Low-residue products that lift soil without harsh chemical odors.
        </FeatureCard>
        <FeatureCard :icon="shieldIcon" title="Safe for kids & pets">
          Rooms are ready to walk on the same day, with nothing left behind.
        </FeatureCard>
        <FeatureCard :icon="sparkleIcon" title="A cleaner, healthier home">
          Hot water extraction removes the dust, dander and grit vacuums miss.
        </FeatureCard>
      </div>
    </section>

    <section class="band">
      <div class="container section">
        <h2 class="section-title big">What we clean</h2>
        <p class="section-lede">Residential and commercial, by the room or by the whole home.</p>
        <div class="grid-auto services" style="--min: 280px">
          <div v-for="s in services" :key="s.title" class="service">
            <div class="service-top">
              <div class="service-disc"><img :src="s.icon" alt="" /></div>
            </div>
            <div class="service-body">
              <h3>{{ s.title }}</h3>
              <p>{{ s.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container section">
      <div class="promo">
        <div>
          <h2>Fresh Spaces. Higher Living.</h2>
          <p>
            Three rooms for $149, five for $239, or the whole home up to 1,500 carpeted square feet
            for $329. Minimum service call is {{ business.minimumCall }}.
          </p>
        </div>
        <div class="promo-actions">
          <RouterLink to="/services" class="btn btn-accent">View the full price list</RouterLink>
          <RouterLink to="/contact" class="btn btn-outline-light">Book a cleaning</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  border-top: 0;
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 48px;
  align-items: center;
  padding-block: 64px 72px;
}
.hero .eyebrow {
  margin-bottom: 14px;
}
h1 {
  font-size: 56px;
  line-height: 1.04;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.hero .rule {
  margin-block: 26px;
}
.lede {
  max-width: 44ch;
  margin-bottom: 30px;
  font-size: 19px;
  line-height: 1.6;
  color: var(--c-ink-soft);
  text-wrap: pretty;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.actions .btn-outline {
  padding: 14px 26px;
}
.hero-photo {
  height: 420px;
}

.section-title.big {
  font-size: 34px;
}
.section-lede {
  margin-bottom: 34px;
}

.services {
  gap: 18px;
  grid-auto-rows: 1fr;
}
.service {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--c-line);
  border-radius: var(--radius-sm);
  background: var(--c-paper);
}
.service-top {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px 18px;
  background: var(--c-green);
}
.service-disc {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 999px;
  background: var(--c-paper);
}
.service-disc img {
  display: block;
  width: 78px;
  height: 78px;
  object-fit: contain;
}
.service-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 20px 18px 22px;
  background: var(--c-card);
}
.service-body h3 {
  font-size: 17px;
  font-weight: 700;
}
.service-body p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-ink-soft);
  text-wrap: pretty;
}

.promo {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;
  padding: 54px 48px;
  border-radius: var(--radius-lg);
  background: var(--c-green);
}
.promo h2 {
  margin-bottom: 12px;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #fff;
}
.promo p {
  max-width: 46ch;
  font-size: 18px;
  line-height: 1.6;
  color: var(--c-on-green);
}
.promo-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.promo-actions .btn-outline-light {
  padding: 14px 22px;
}

@media (max-width: 860px) {
  .hero-grid,
  .promo {
    grid-template-columns: minmax(0, 1fr);
  }
  .hero-grid {
    gap: 36px;
    padding-block: 44px 52px;
  }
  .hero-photo {
    height: 280px;
  }
}
@media (max-width: 760px) {
  h1 {
    font-size: 40px;
  }
  .section-title.big,
  .promo h2 {
    font-size: 28px;
  }
  .promo {
    gap: 28px;
    padding: 36px 26px;
  }
}
</style>
