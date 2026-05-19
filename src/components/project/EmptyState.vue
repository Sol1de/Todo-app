<script setup lang="ts">
import { Archive, Plus } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

defineEmits<{
  (e: 'create-project'): void
}>()
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center gap-8">
    <Card class="w-[480px] items-center px-12 py-14 text-center">
      <div class="flex size-20 items-center justify-center rounded-full bg-muted">
        <Archive class="size-8 text-muted-foreground" />
      </div>

      <div class="flex flex-col items-center gap-2">
        <h2 class="text-3xl font-bold">No projects yet</h2>
        <p class="max-w-xs text-sm text-muted-foreground">
          It looks a little quiet here. Start organizing your work by creating your first project space.
        </p>
      </div>

      <Button @click="$emit('create-project')">
        <Plus class="size-4" />
        Create Project
      </Button>
    </Card>

    <span class="text-xs font-semibold uppercase tracking-widest text-muted-foreground/40">
      Caffeine Tasks Workspace
    </span>
  </div>
</template>
