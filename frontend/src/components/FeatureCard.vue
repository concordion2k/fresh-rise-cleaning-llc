<script setup lang="ts">
defineProps<{
  icon: string;
  title: string;
}>();
</script>

<template>
  <div class="card">
    <img :src="icon" alt="" class="icon" />
    <h3 class="card-title">{{ title }}</h3>
    <p class="body-copy"><slot /></p>
  </div>
</template>

<style scoped>
.icon {
  display: block;
  height: 44px;
  width: auto;
  margin-bottom: 16px;
}
</style>
