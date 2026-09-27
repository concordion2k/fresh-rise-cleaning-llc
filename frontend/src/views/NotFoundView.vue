<script setup lang="ts">
import { RouterLink } from 'vue-router';
import sun from '@/assets/mark-sun.png';
</script>

<template>
  <section class="container notfound">
    <img :src="sun" alt="" width="120" height="120" />
    <h1>We couldn&rsquo;t find that page</h1>
    <p class="body-copy">It may have moved. Let&rsquo;s get you back somewhere fresh.</p>
    <RouterLink to="/" class="btn btn-primary">Back home</RouterLink>
  </section>
</template>

<style scoped>
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-block: 88px;
  text-align: center;
}
h1 {
  font-size: 34px;
  font-weight: 800;
}
.btn {
  margin-top: 8px;
}
</style>
