<script setup lang="ts">
// Striped stand-in for a photo that hasn't been shot yet. Swap for an <img> once it exists.
defineProps<{
  /** Describes the photo that belongs here. */
  label: string;
}>();
</script>

<template>
  <div class="placeholder" role="img" :aria-label="`Photo coming soon: ${label}`">
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--c-line);
  border-radius: var(--radius);
  background-color: var(--c-tint);
  background-image: repeating-linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.1) 0 10px,
    transparent 10px 20px
  );
}
span {
  max-width: 32ch;
  padding: 0 24px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--c-muted);
  text-align: center;
}
</style>
