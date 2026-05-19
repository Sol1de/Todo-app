<script setup lang="ts">
import { Circle, CircleCheckBig } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

defineProps<{
  id: string
  title: string
  priority?: 'high' | 'medium' | 'low'
  completed?: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
}>()

const priorityConfig = {
  high: { variant: 'destructive' as const, label: 'High' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  low: { variant: 'outline' as const, label: 'Low' },
}
</script>

<template>
  <Card class="!flex-row items-center gap-4 px-4 !py-4">
    <CircleCheckBig v-if="completed" class="size-6 shrink-0 cursor-pointer text-primary" @click="$emit('toggle')" />
    <Circle v-else class="size-6 shrink-0 cursor-pointer text-muted-foreground/40 hover:text-muted-foreground" @click="$emit('toggle')" />
    <span
      :class="[
        'flex-1 text-base',
        completed && 'line-through text-muted-foreground',
      ]"
    >
      {{ title }}
    </span>
    <Badge
      v-if="priority && !completed"
      :variant="priorityConfig[priority].variant"
    >
      {{ priorityConfig[priority].label }}
    </Badge>
  </Card>
</template>
