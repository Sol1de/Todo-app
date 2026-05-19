<script setup lang="ts">
defineProps<{
  name: string
  description: string
}>()
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold">{{ name }}</h2>
    <p class="mt-1 text-muted-foreground">{{ description }}</p>
  </div>
</template>
