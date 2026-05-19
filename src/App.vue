<script setup lang="ts">
import {ref, computed} from 'vue'
import {ScrollArea} from '@/components/ui/scroll-area'
import AppLayout from '@/components/layout/AppLayout.vue'
import TopAppBar from '@/components/layout/TopAppBar.vue'
import ProjectHeader from '@/components/project/ProjectHeader.vue'
import CompletionCard from '@/components/project/CompletionCard.vue'
import CreateProjectDialog from '@/components/dialogs/CreateProjectDialog.vue'
import EmptyState from '@/components/project/EmptyState.vue'
import TaskFilters from '@/components/task/TaskFilters.vue'
import TaskInput from '@/components/task/TaskInput.vue'
import TaskList from '@/components/task/TaskList.vue'
import AddTaskDialog from '@/components/dialogs/AddTaskDialog.vue'
import {projectState} from '@/stores/projectStore'
import {taskState} from '@/stores/taskStore'

const activeProject = ref('')
const addTaskOpen = ref(false)
const createProjectOpen = ref(false)

const projects = computed(() => projectState.projects)
const tasks = computed(() => taskState.tasks)
const hasProjects = computed(() => projects.value.length > 0)
const completionRate = computed(() => {
  if (!tasks.value.length) return 0
  return Math.round((tasks.value.filter(t => t.completed).length / tasks.value.length) * 100)
})

const activeProjectData = computed(() =>
    projects.value.find(p => p.name === activeProject.value)
)
</script>

<template>
  <AppLayout
      :active-project="activeProject"
      :projects="projects"
      @new-project="createProjectOpen = true"
      @select-project="activeProject = $event"
  >
    <TopAppBar :show-add-task="hasProjects" @add-task="addTaskOpen = true"/>

    <EmptyState v-if="!hasProjects" @create-project="createProjectOpen = true"/>

    <ScrollArea v-else class="flex-1">
      <div class="mx-auto max-w-4xl space-y-6 px-20 py-6">
        <ProjectHeader
            :name="activeProject"
            :description="activeProjectData?.description ?? ''"
        />
        <CompletionCard :rate="completionRate"/>
        <TaskFilters/>
        <TaskInput/>
        <TaskList :tasks="tasks"/>
      </div>
    </ScrollArea>

    <AddTaskDialog v-model:open="addTaskOpen"/>
    <CreateProjectDialog v-model:open="createProjectOpen" @project-created="activeProject = $event"/>
  </AppLayout>
</template>
