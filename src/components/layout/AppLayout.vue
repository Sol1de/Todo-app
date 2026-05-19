<script setup lang="ts">
import SideNavBar from './SideNavBar.vue'

withDefaults(defineProps<{
  hasProjects?: boolean
  activeProject?: string
}>(), {
  hasProjects: true,
})

defineEmits<{
  (e: 'new-project'): void
  (e: 'select-project', label: string): void
}>()
</script>

<template>
  <div class="flex h-screen">
    <SideNavBar :has-projects="hasProjects" :active-project="activeProject" @new-project="$emit('new-project')" @select-project="$emit('select-project', $event)" />
    <main class="flex flex-1 flex-col overflow-auto bg-background">
      <slot />
    </main>
  </div>
</template>
