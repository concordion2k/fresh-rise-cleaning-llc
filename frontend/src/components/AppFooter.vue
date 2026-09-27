<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { business, phoneHref, emailHref } from '@/content/business';
import logo from '@/assets/logo-tagline.png';
import wave from '@/assets/wave.png';

const year = new Date().getFullYear();
</script>

<template>
  <div class="wave" :style="{ backgroundImage: `url(${wave})` }" aria-hidden="true"></div>
  <footer class="site-footer">
    <div class="container cols">
      <div>
        <img :src="logo" :alt="business.name" class="logo" width="142" height="50" />
        <p class="text">{{ business.tagline }}<br />Serving the {{ business.serviceArea }} area.</p>
      </div>
      <div>
        <h2 class="heading">Contact</h2>
        <p class="text lines">
          <a :href="phoneHref">{{ business.phone }}</a
          ><br />
          <a :href="emailHref" class="email">{{ business.email }}</a
          ><br />
          {{ business.hoursShort }}
        </p>
      </div>
      <nav aria-label="Footer">
        <h2 class="heading">Pages</h2>
        <p class="text lines">
          <RouterLink to="/about">About</RouterLink><br />
          <RouterLink to="/services">Services</RouterLink><br />
          <RouterLink to="/contact">Contact Us</RouterLink>
        </p>
      </nav>
    </div>
    <div class="base">
      <p class="container copy">&copy; {{ year }} {{ business.legalName }}. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.wave {
  height: 86px;
  margin-top: auto;
  background-color: var(--c-paper);
  background-repeat: repeat-x;
  background-position: center;
  background-size: auto 86px;
  opacity: 0.85;
}
.site-footer {
  background: var(--c-card);
  border-top: 1px solid var(--c-line);
}
.cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 32px;
  padding-block: 44px;
}
.logo {
  display: block;
  height: 50px;
  width: auto;
  margin-bottom: 14px;
}
.heading {
  margin-bottom: 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-muted);
}
.text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--c-ink-soft);
}
.lines {
  line-height: 1.9;
}
.email {
  word-break: break-word;
}
.base {
  border-top: 1px solid var(--c-line);
}
.copy {
  padding-block: 18px;
  font-size: 13px;
  color: var(--c-muted);
}
</style>
