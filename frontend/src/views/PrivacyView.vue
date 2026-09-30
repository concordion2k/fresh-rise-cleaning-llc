<script setup lang="ts">
import PageHero from '@/components/PageHero.vue';
import RichText from '@/components/RichText.vue';
import { lastUpdated, sections, summary } from '@/content/privacy';
</script>

<template>
  <div>
    <PageHero eyebrow="Your privacy" title="Privacy Policy">
      Last updated {{ lastUpdated }}
    </PageHero>

    <div class="container">
      <div class="legal">
        <aside class="card at-a-glance">
          <h2>The short version</h2>
          <ul>
            <li v-for="(line, i) in summary" :key="i">{{ line }}</li>
          </ul>
        </aside>

        <nav class="toc" aria-label="Contents">
          <h2>Contents</h2>
          <ol>
            <li v-for="s in sections" :key="s.id">
              <a :href="`#${s.id}`">{{ s.title }}</a>
            </li>
          </ol>
        </nav>

        <section v-for="(s, i) in sections" :id="s.id" :key="s.id" class="clause">
          <h2>{{ i + 1 }}. {{ s.title }}</h2>
          <template v-for="(block, bi) in s.body" :key="bi">
            <h3 v-if="'h3' in block">{{ block.h3 }}</h3>
            <ul v-else-if="'list' in block">
              <li v-for="(item, li) in block.list" :key="li"><RichText :value="item" /></li>
            </ul>
            <p v-else><RichText :value="block.p" /></p>
          </template>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Readable line length, left-aligned with the page title above. */
.legal {
  max-width: 780px;
  padding-block: 48px 64px;
}

.at-a-glance {
  margin-bottom: 36px;
  border-left: 5px solid var(--c-orange);
}
.at-a-glance h2,
.toc h2 {
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-muted);
}
.at-a-glance ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 16px;
  line-height: 1.7;
  color: var(--c-ink);
}

.toc {
  margin-bottom: 44px;
}
.toc ol {
  margin: 0;
  padding-left: 1.4rem;
  columns: 2;
  column-gap: 2.5rem;
  font-size: 15px;
  line-height: 1.5;
}
.toc li {
  margin-bottom: 6px;
  break-inside: avoid;
  color: var(--c-muted);
}
.toc a {
  font-weight: 600;
}

.clause {
  margin-bottom: 36px;
  /* Clear the sticky header when jumping to a section. */
  scroll-margin-top: 110px;
}
.clause h2 {
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.clause h3 {
  margin: 20px 0 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--c-ink);
}
.clause p,
.clause ul {
  margin: 0 0 12px;
  font-size: 16px;
  line-height: 1.75;
  color: var(--c-ink-soft);
}
.clause ul {
  padding-left: 1.3rem;
}
.clause li {
  margin-bottom: 6px;
}
.clause a,
.toc a {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

@media (max-width: 640px) {
  .toc ol {
    columns: 1;
  }
}
</style>
