<script setup lang="ts">
import type { Component } from 'vue'
import { Badge } from '@/components/ui/badge'

defineProps<{
  icon: Component
  label: string
  count: number
  active?: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<template>
  <div
    :class="[
      'flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors',
      active
        ? 'border-l-[3px] border-primary text-primary font-medium'
        : 'border-l-[3px] border-transparent text-muted-foreground hover:bg-accent',
    ]"
    @click="$emit('select')"
  >
    <component :is="icon" class="size-[18px] shrink-0" />
    <span class="flex-1 text-sm">{{ label }}</span>
    <Badge
      :variant="active ? 'default' : 'secondary'"
      class="text-xs tabular-nums"
    >
      {{ count }}
    </Badge>
  </div>
</template>
