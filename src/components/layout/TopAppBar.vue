<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

withDefaults(defineProps<{
  title?: string
  showAddTask?: boolean
}>(), {
  title: 'Caffeine Tasks',
  showAddTask: true,
})

defineEmits<{
  (e: 'add-task'): void
}>()
</script>

<template>
  <header class="flex items-center justify-between border-b border-border px-6 py-2">
    <h1 class="text-4xl font-bold">{{ title }}</h1>
    <Button v-if="showAddTask" size="sm" @click="$emit('add-task')">
      <Plus class="size-3.5" />
      Add task
    </Button>
  </header>
</template>
