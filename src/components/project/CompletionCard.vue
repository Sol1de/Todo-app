<script setup lang="ts">
import {TrendingUp} from 'lucide-vue-next'
import {Card, CardContent} from '@/components/ui/card'
import {Progress} from '@/components/ui/progress'

defineProps<{
  rate: number
}>()
</script>

<template>
  <Card>
    <CardContent class="flex flex-col gap-2 p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1 text-sm text-muted-foreground">
          <TrendingUp class="size-3.5"/>
          <span>Completion Rate</span>
        </div>
        <span class="text-sm font-medium">{{ rate }}%</span>
      </div>
      <Progress :model-value="rate" class="h-2"/>
    </CardContent>
  </Card>
</template>
