<script setup lang="ts">
import { reactive, ref } from 'vue';
import PageHero from '@/components/PageHero.vue';
import { business, phoneHref, emailHref } from '@/content/business';
import { serviceOptions } from '@/content/services';
import { buildQuoteMailto, type QuoteRequest } from '@/utils/mailto';

const form = reactive<QuoteRequest>({
  name: '',
  phone: '',
  email: '',
  location: '',
  service: serviceOptions[0] ?? '',
  items: '',
  notes: '',
});

const sent = ref(false);

function submit() {
  // No backend: open the visitor's email app with the request filled in, addressed to the owner.
  window.location.href = buildQuoteMailto(business.email, form);
  sent.value = true;
}

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(business.serviceArea)}&z=11&output=embed`;
</script>

<template>
  <div>
    <PageHero eyebrow="Contact us" title="Request a free quote">
      Call or text for the fastest answer, or send the form and we will get back to you the same
      business day.
    </PageHero>

    <section class="container layout">
      <form class="card form" @submit.prevent="submit">
        <h2>Tell us about the job</h2>
        <div class="fields">
          <label>
            <span>Name</span>
            <input
              v-model="form.name"
              type="text"
              placeholder="Your name"
              autocomplete="name"
              required
            />
          </label>
          <label>
            <span>Phone</span>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="(000) 000-0000"
              autocomplete="tel"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@email.com"
              autocomplete="email"
            />
          </label>
          <label>
            <span>City / ZIP</span>
            <input
              v-model="form.location"
              type="text"
              :placeholder="business.serviceArea"
              autocomplete="postal-code"
            />
          </label>
          <label>
            <span>Service needed</span>
            <select v-model="form.service">
              <option v-for="o in serviceOptions" :key="o">{{ o }}</option>
            </select>
          </label>
          <label>
            <span>Rooms / items</span>
            <input v-model="form.items" type="text" placeholder="e.g. 3 rooms, hallway, 1 sofa" />
          </label>
          <label class="full">
            <span>Anything else we should know</span>
            <textarea
              v-model="form.notes"
              rows="4"
              placeholder="Pet areas, stains, stairs, preferred days"
            ></textarea>
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-block submit">Send my request</button>
        <p class="status" aria-live="polite">
          <template v-if="sent">
            Your email app should open with your request filled in &mdash; just hit send. If it
            didn&rsquo;t, email us at <a :href="emailHref">{{ business.email }}</a> or call
            <a :href="phoneHref">{{ business.phone }}</a
            >.
          </template>
          <template v-else>
            We&rsquo;ll never share your details. Prefer to talk? Call or text
            <a :href="phoneHref">{{ business.phone }}</a
            >.
          </template>
        </p>
      </form>

      <aside class="side">
        <div class="card direct">
          <h2 class="direct-heading">Reach us directly</h2>
          <p class="label">Phone &amp; text</p>
          <p class="value phone">
            <a :href="phoneHref">{{ business.phone }}</a>
          </p>
          <p class="label">Email</p>
          <p class="value email">
            <a :href="emailHref">{{ business.email }}</a>
          </p>
          <p class="label">Hours</p>
          <p class="value hours">{{ business.hours }}</p>
        </div>
        <div class="area">
          <h2>Service area</h2>
          <p>
            We cover the {{ business.serviceArea }} area and the surrounding neighborhoods. Not sure
            if you are in range? Call and ask.
          </p>
        </div>
        <iframe
          class="map"
          :src="mapSrc"
          :title="`Map of the ${business.serviceArea} service area`"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: 44px;
  align-items: start;
  padding-block: 56px 72px;
}

.form {
  padding: 36px;
  border-radius: 20px;
}
.form h2 {
  margin-bottom: 24px;
  font-size: 22px;
  font-weight: 800;
}
.fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: 18px;
}
label {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
label.full {
  grid-column: 1 / -1;
}
label span {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-ink-soft);
}
input,
select,
textarea {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid var(--c-field-line);
  border-radius: var(--radius-field);
  background: var(--c-field-bg);
  color: var(--c-ink);
  font-family: inherit;
  font-size: 15px;
}
textarea {
  resize: vertical;
}
/* Replace the native arrow (which hugs the right edge) with our own chevron, inset to match the
   text padding. */
select {
  appearance: none;
  padding-right: 44px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%233D4A40' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 12px 8px;
  cursor: pointer;
}
:root[data-theme='dark'] select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%23B9C7BC' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
input:focus,
select:focus,
textarea:focus {
  border-color: var(--c-leaf);
  outline: 2px solid rgba(76, 175, 80, 0.25);
  outline-offset: 0;
}
.submit {
  margin-top: 24px;
  padding: 17px 24px;
}
.status {
  margin-top: 14px;
  font-size: 13px;
  line-height: 1.55;
  color: var(--c-muted);
}

.side {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.direct {
  padding: 30px;
  border-radius: 20px;
}
.direct-heading {
  margin-bottom: 18px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-muted);
}
.label {
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--c-leaf);
}
.value {
  margin-bottom: 20px;
}
.value.phone {
  font-size: 24px;
  font-weight: 800;
}
.value.email {
  font-size: 16px;
  font-weight: 600;
  word-break: break-word;
}
.value.hours {
  margin-bottom: 0;
  font-size: 16px;
  color: var(--c-ink);
}

.area {
  padding: 30px;
  border-radius: 20px;
  background: var(--c-green);
}
.area h2 {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 800;
  color: #fff;
}
.area p {
  font-size: 15px;
  line-height: 1.65;
  color: var(--c-on-green);
}

.map {
  display: block;
  width: 100%;
  height: 240px;
  border: 1px solid var(--c-line);
  border-radius: 20px;
  background: var(--c-tint);
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    padding-block: 40px 56px;
  }
}
@media (max-width: 760px) {
  .form {
    padding: 26px 22px;
  }
}
</style>
