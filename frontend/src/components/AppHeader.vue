<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { business, phoneHref } from '@/content/business';
import { useTheme } from '@/composables/useTheme';
import logo from '@/assets/logo-tagline.png';
import logoDark from '@/assets/logo-tagline-dark.png';

const { current: theme } = useTheme();

const menuOpen = ref(false);

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];
</script>

<template>
  <header class="site-header">
    <div class="container bar">
      <RouterLink to="/" class="brand" @click="menuOpen = false">
        <img
          :src="theme === 'dark' ? logoDark : logo"
          :alt="business.name"
          width="158"
          height="56"
        />
      </RouterLink>

      <button
        class="burger"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        @click="menuOpen = !menuOpen"
      >
        <span class="sr-only">Menu</span>
        <span></span><span></span><span></span>
      </button>

      <nav id="site-nav" class="nav" :class="{ open: menuOpen }" @click="menuOpen = false">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link">
          {{ l.label }}
        </RouterLink>
        <a :href="phoneHref" class="phone">{{ business.phone }}</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--c-card);
  border-bottom: 1px solid var(--c-line);
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-block: 14px;
}
.brand {
  line-height: 0;
}
.brand img {
  height: 56px;
  width: auto;
}
.nav {
  display: flex;
  align-items: center;
  gap: 26px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.nav-link {
  padding-bottom: 3px;
  border-bottom: 2px solid transparent;
  color: var(--c-ink-soft);
}
.nav-link:hover {
  color: var(--c-green-text);
}
/* Exact-active so "Home" isn't highlighted on every page. */
.nav-link.router-link-exact-active {
  color: var(--c-green-text);
  border-bottom-color: var(--c-orange);
}
.phone {
  padding: 11px 18px;
  border-radius: 999px;
  background: var(--c-orange);
  color: #fff;
  letter-spacing: 0.04em;
}
.phone:hover {
  background: var(--c-orange-dark);
  color: #fff;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 6px;
  border: none;
  background: none;
  cursor: pointer;
}
.burger span:not(.sr-only) {
  width: 26px;
  height: 3px;
  border-radius: 3px;
  background: var(--c-green-text);
}

@media (max-width: 820px) {
  .brand img {
    height: 46px;
  }
  .burger {
    display: flex;
  }
  .nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding: 12px var(--gutter) 20px;
    background: var(--c-card);
    border-bottom: 1px solid var(--c-line);
    box-shadow: 0 12px 24px rgba(30, 43, 34, 0.08);
  }
  .nav.open {
    display: flex;
  }
  .nav-link {
    padding: 12px 0;
    border-bottom: 1px solid var(--c-line-soft);
  }
  .nav-link.router-link-exact-active {
    border-bottom-color: var(--c-line-soft);
  }
  .phone {
    margin-top: 12px;
    text-align: center;
  }
}
</style>
