<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { business, phoneHref, emailHref } from '@/content/business';
import { useTheme } from '@/composables/useTheme';
import logo from '@/assets/logo-tagline.png';
import logoDark from '@/assets/logo-tagline-dark.png';

const year = new Date().getFullYear();
const { current: theme, toggle } = useTheme();
</script>

<template>
  <!-- Layered waves that stretch edge to edge; the front layer is the footer's own color, so the
       waves flow straight into it. -->
  <svg class="wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
    <path class="wave-back" d="M0 46C180 18 360 14 560 38s380 50 560 28 260-36 320-40V120H0Z" />
    <path
      class="wave-mid"
      d="M0 76c200-34 420-38 640-12s400 36 560 16c100-12 180-26 240-30V120H0Z"
    />
    <path class="wave-front" d="M0 100c240-26 480-30 720-10s480 24 720-6V120H0Z" />
  </svg>
  <footer class="site-footer">
    <div class="container cols">
      <div>
        <img
          :src="theme === 'dark' ? logoDark : logo"
          :alt="business.name"
          class="logo"
          width="142"
          height="50"
        />
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
          <RouterLink to="/specials">Specials</RouterLink><br />
          <RouterLink to="/contact">Contact Us</RouterLink><br />
          <RouterLink to="/privacy">Privacy Policy</RouterLink>
        </p>
      </nav>
    </div>
    <div class="base">
      <div class="container base-row">
        <p class="copy">&copy; {{ year }} {{ business.legalName }}. All rights reserved.</p>
        <label class="theme-switch" title="Toggle dark mode">
          <span class="theme-icon" :class="{ on: theme === 'light' }" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
              />
            </svg>
          </span>
          <input
            type="checkbox"
            :checked="theme === 'dark'"
            aria-label="Dark mode"
            @change="toggle()"
          />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span class="theme-icon" :class="{ on: theme === 'dark' }" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </span>
        </label>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.wave {
  --wave-back: rgba(167, 212, 106, 0.35);
  --wave-mid: rgba(76, 175, 80, 0.3);

  display: block;
  width: 100%;
  height: clamp(56px, 7vw, 100px);
  margin-top: auto;
  /* Keeps the footer's edge from showing a hairline gap on some zoom levels. */
  margin-bottom: -1px;
}
:root[data-theme='dark'] .wave {
  --wave-back: rgba(76, 175, 80, 0.1);
  --wave-mid: rgba(76, 175, 80, 0.2);
}
.wave-back {
  fill: var(--wave-back);
}
.wave-mid {
  fill: var(--wave-mid);
}
.wave-front {
  fill: var(--c-card);
}
.site-footer {
  background: var(--c-card);
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
.base-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  padding-block: 14px;
}
.copy {
  font-size: 13px;
  color: var(--c-muted);
}

/* Theme toggle: sun · switch · moon. The active side's icon is lit in orange. */
.theme-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.theme-switch input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}
.theme-icon {
  display: inline-flex;
  color: var(--c-muted);
  transition: color 0.18s ease;
}
.theme-icon.on {
  color: var(--c-orange);
}
.toggle-track {
  position: relative;
  flex-shrink: 0;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: var(--c-line);
  transition: background 0.18s ease;
}
.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.18s ease;
}
.theme-switch input:checked + .toggle-track {
  background: var(--c-green);
}
.theme-switch input:checked + .toggle-track .toggle-thumb {
  transform: translateX(18px);
}
.theme-switch input:focus-visible + .toggle-track {
  outline: 3px solid var(--c-orange);
  outline-offset: 2px;
}
</style>
