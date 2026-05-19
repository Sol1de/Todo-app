<script setup lang="ts">import {LayoutList, Calendar, AlertCircle, FolderClosed, Plus} from 'lucide-vue-next'
import {Button} from '@/components/ui/button'
import NavItem from './NavItem.vue'
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
  <aside class="flex w-64 flex-col border-r border-border bg-card">
    <div class="px-6 pt-6 pb-4">
      <div class="flex items-center gap-2">
        <img src="/logo.svg" alt="Caffeine Tasks Logo" class="size-4"/>
        <h1 class="text-xl font-bold">Projects</h1>
      </div>
      <p class="mt-1 text-sm text-muted-foreground">Stay Focused</p>
    </div>

    <nav v-if="projects.length" class="flex-1">
      <NavItem :icon="LayoutList" label="All Tasks" :active="activeProject === 'All Tasks'"
               @select="$emit('select-project', 'All Tasks')"/>
      <NavItem :icon="Calendar" label="Today" :active="activeProject === 'Today'"
               @select="$emit('select-project', 'Today')"/>
      <NavItem :icon="AlertCircle" label="Important" :active="activeProject === 'Important'"
               @select="$emit('select-project', 'Important')"/>
      <NavItem
          v-for="project in projects"
          :key="project.id"
          :icon="FolderClosed"
          :label="project.name"
          :active="activeProject === project.name"
          @select="$emit('select-project', project.name)"
      />
    </nav>
    <div v-else class="flex-1"/>

    <div class="p-6">
      <Button variant="outline" class="w-full" @click="$emit('new-project')">
        <Plus class="size-3.5"/>
        New Project
      </Button>
    </div>
  </aside>
</template>
