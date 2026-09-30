<script setup lang="ts">
// Renders copy that mixes text with links (see content/rich.ts) without resorting to v-html.
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import type { Inline, Rich } from '@/content/rich';

const props = defineProps<{ value: Rich }>();

const parts = computed<Inline[]>(() =>
  typeof props.value === 'string' ? [props.value] : props.value,
);

const isExternal = (href: string) => /^https?:/.test(href);
</script>

<template>
  <template v-for="(part, i) in parts" :key="i">
    <template v-if="typeof part === 'string'">{{ part }}</template>
    <RouterLink v-else-if="'to' in part" :to="part.to">{{ part.text }}</RouterLink>
    <a
      v-else
      :href="part.href"
      :target="isExternal(part.href) ? '_blank' : undefined"
      :rel="isExternal(part.href) ? 'noopener' : undefined"
      >{{ part.text }}</a
    >
  </template>
</template>
