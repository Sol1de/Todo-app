<script setup lang="ts">
import { computed } from 'vue'
import * as icons from 'lucide-vue-next'

const props = defineProps<{
  name: string
  fallback?: string
}>()

const icon = computed(() => {
  const pascal = props.name
    .replace('lucide:', '')
    .replace(/(^|-)(\w)/g, (_: string, __: string, c: string) => c.toUpperCase())
  return (icons as Record<string, unknown>)[pascal] ?? (icons as Record<string, unknown>)[props.fallback ?? 'FolderClosed']
})
</script>

<template>
  <component :is="icon" />
</template>
