<script setup lang="ts">
import {ref} from 'vue'
import {ScrollArea} from '@/components/ui/scroll-area'
import AppLayout from '@/components/layout/AppLayout.vue'
import TopAppBar from '@/components/layout/TopAppBar.vue'
import ProjectHeader from '@/components/project/ProjectHeader.vue'
import CompletionCard from '@/components/project/CompletionCard.vue'
import CreateProjectDialog from '@/components/project/CreateProjectDialog.vue'
import EmptyState from '@/components/project/EmptyState.vue'
import TaskFilters from '@/components/task/TaskFilters.vue'
import TaskInput from '@/components/task/TaskInput.vue'
import TaskList from '@/components/task/TaskList.vue'
import AddTaskDialog from '@/components/task/AddTaskDialog.vue'

const hasProjects = ref(false)
const activeProject = ref('Personal')
const addTaskOpen = ref(false)
const createProjectOpen = ref(false)
</script>

<template>
  <AppLayout :has-projects="hasProjects" :active-project="activeProject" @new-project="createProjectOpen = true"
             @select-project="activeProject = $event">
    <TopAppBar :show-add-task="hasProjects" @add-task="addTaskOpen = true"/>

    <EmptyState v-if="!hasProjects" @create-project="createProjectOpen = true"/>

    <ScrollArea v-else class="flex-1">
      <div class="mx-auto max-w-4xl space-y-6 px-20 py-6">
        <ProjectHeader
            :name="activeProject"
            description="Manage your daily personal goals."
        />
        <CompletionCard :rate="65"/>
        <TaskFilters/>
        <TaskInput/>
        <TaskList/>
      </div>
    </ScrollArea>

    <AddTaskDialog v-model:open="addTaskOpen"/>
    <CreateProjectDialog v-model:open="createProjectOpen"/>
  </AppLayout>
</template>
