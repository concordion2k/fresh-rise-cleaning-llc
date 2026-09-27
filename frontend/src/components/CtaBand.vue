<script setup lang="ts">
// Rounded deep-green call-to-action panel. Default slot = buttons/links.
defineProps<{
  title: string;
  /** Max heading width in `ch`. */
  titleWidth?: number;
}>();
</script>

<template>
  <div class="cta">
    <h2 :style="titleWidth ? { maxWidth: `${titleWidth}ch` } : undefined">{{ title }}</h2>
    <slot />
  </div>
</template>

<style scoped>
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 28px;
  padding: 44px;
  border-radius: var(--radius-lg);
  background: var(--c-green);
}
h2 {
  max-width: 30ch;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #fff;
}

@media (max-width: 760px) {
  .cta {
    padding: 32px 26px;
  }
  h2 {
    font-size: 24px;
  }
}
</style>
