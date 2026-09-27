<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PageHero from '@/components/PageHero.vue';
import CtaBand from '@/components/CtaBand.vue';
import FeatureCard from '@/components/FeatureCard.vue';
import ImagePlaceholder from '@/components/ImagePlaceholder.vue';
import { business } from '@/content/business';
import peopleIcon from '@/assets/icon-people.png';
import shieldIcon from '@/assets/icon-shield.png';
import heartIcon from '@/assets/icon-heart.png';

const steps = [
  {
    num: '01',
    title: 'Walk the space',
    body: 'We look at every room together, note traffic lanes, spots and pet areas, and tell you what we can realistically fix.',
  },
  {
    num: '02',
    title: 'Pre-treat and agitate',
    body: 'Soil is loosened with the right pre-spray for the fiber before any water goes down.',
  },
  {
    num: '03',
    title: 'Hot water extraction',
    body: 'Deep rinse and strong extraction pulls the soil and most of the moisture back out.',
  },
  {
    num: '04',
    title: 'Groom and check',
    body: 'Carpet is groomed to dry evenly, and we walk the job with you before we pack up.',
  },
];
</script>

<template>
  <div>
    <PageHero eyebrow="About us" title="A family business built on careful work" />

    <section class="container section">
      <div class="story">
        <div class="story-copy">
          <p>
            {{ business.name }} is a family owned carpet and upholstery cleaning company serving the
            Four Corners, Florida area. We started it for a simple reason: we wanted the kind of
            service we had trouble finding ourselves &mdash; someone who shows up when they say they
            will, explains what a room actually needs, and leaves the house better than they found
            it.
          </p>
          <p>
            Every job is done by the two of us. That means the person who answers your call is the
            person cleaning your carpet, and there is no crew to hand your home off to. We use hot
            water extraction with low-residue, eco-friendly products, so rooms dry quickly and are
            safe for kids and pets the same day.
          </p>
          <p>
            We quote before we start, we price by the room so you know what you are paying for, and
            we would rather tell you a stain will not come out than promise something we cannot
            deliver.
          </p>
        </div>
        <ImagePlaceholder
          label="owner portrait — the two of you with the van or equipment"
          class="portrait"
        />
      </div>
    </section>

    <section class="band">
      <div class="container section">
        <h2 class="section-title steps-title">How we work</h2>
        <ol class="grid-auto steps" style="--min: 230px">
          <li v-for="s in steps" :key="s.num">
            <p class="step-num" aria-hidden="true">{{ s.num }}</p>
            <h3 class="card-title">{{ s.title }}</h3>
            <p class="body-copy">{{ s.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="container section">
      <div class="grid-auto" style="--min: 240px">
        <FeatureCard :icon="peopleIcon" title="Family owned and operated">
          No subcontractors, no rotating crews. The same two people every visit.
        </FeatureCard>
        <FeatureCard :icon="shieldIcon" title="Honest, room-based pricing">
          Published rates, quoted up front. Add-ons are optional and explained.
        </FeatureCard>
        <FeatureCard :icon="heartIcon" title="Local to Four Corners">
          We live here too, and most of our work comes from neighbors telling neighbors.
        </FeatureCard>
      </div>
      <CtaBand title="Tell us what needs cleaning and we will send a quote." class="cta">
        <RouterLink to="/contact" class="btn btn-accent">Get in touch</RouterLink>
      </CtaBand>
    </section>
  </div>
</template>

<style scoped>
.story {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 56px;
  align-items: start;
}
.story-copy {
  font-size: 17px;
  line-height: 1.75;
  color: var(--c-ink-soft);
}
.story-copy p {
  text-wrap: pretty;
}
.story-copy p + p {
  margin-top: 20px;
}
.portrait {
  min-height: 340px;
}

.steps-title {
  margin-bottom: 30px;
}
.steps {
  gap: 22px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.step-num {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--c-orange);
}
.cta {
  margin-top: 40px;
}

@media (max-width: 860px) {
  .story {
    grid-template-columns: minmax(0, 1fr);
    gap: 36px;
  }
  .portrait {
    min-height: 260px;
  }
}
</style>
