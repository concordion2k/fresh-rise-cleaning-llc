<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
}>();
</script>

<template>
  <div class="card">
    <span class="icon-wrap"><img :src="icon" alt="" class="icon" /></span>
    <h3 class="card-title">{{ title }}</h3>
    <p class="body-copy"><slot /></p>
  </div>
</template>

<style scoped>
.icon-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.icon {
  display: block;
  height: 44px;
  width: auto;
}
/* The glyphs are dark green, which sinks into a dark card — seat them on the brand's cream disc. */
:root[data-theme='dark'] .icon-wrap {
  justify-content: center;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: var(--c-disc);
}
:root[data-theme='dark'] .icon {
  max-width: 42px;
  height: 38px;
  object-fit: contain;
}
</style>
