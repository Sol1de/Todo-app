<script setup lang="ts">
import SideNavBar from './SideNavBar.vue'
import type {Project} from '@/models/Project'

withDefaults(defineProps<{
  activeProject?: string
  projects?: Project[]
}>(), {
  projects: () => [],
})

defineEmits<{
  (e: 'new-project'): void
  (e: 'select-project', label: string): void
}>()
</script>

<template>
  <div class="flex h-screen">
    <SideNavBar :active-project="activeProject" :projects="projects" @new-project="$emit('new-project')" @select-project="$emit('select-project', $event)" />
    <main class="flex flex-1 flex-col overflow-auto bg-background">
      <slot />
    </main>
  </div>
</template>
