<script setup lang="ts">
// Title band at the top of the inner pages: eyebrow, heading, orange rule, optional lede (slot).
defineProps<{
  eyebrow: string;
  title: string;
  /** Max heading width in `ch`, so long titles wrap where the design intends. */
  titleWidth?: number;
}>();
</script>

<template>
  <section class="band page-hero">
    <div class="container">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 :style="titleWidth ? { maxWidth: `${titleWidth}ch` } : undefined">{{ title }}</h1>
      <div class="rule" :class="{ last: !$slots.default }"></div>
      <p v-if="$slots.default" class="lede"><slot /></p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  border-top: 0;
}
.container {
  padding-block: 56px 60px;
}
h1 {
  max-width: 22ch;
  font-size: 48px;
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.rule.last {
  margin-bottom: 0;
}
.lede {
  max-width: 60ch;
  font-size: 18px;
  line-height: 1.65;
  color: var(--c-ink-soft);
  text-wrap: pretty;
}
.lede :deep(strong) {
  color: var(--c-green);
}

@media (max-width: 760px) {
  .container {
    padding-block: 40px 44px;
  }
  h1 {
    font-size: 36px;
  }
}
</style>
