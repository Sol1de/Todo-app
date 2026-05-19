<script setup lang="ts">
import TaskRow from './TaskRow.vue'
import { useTaskService } from '@/composables/useTaskService'

const { tasks, toggleTask } = useTaskService()
</script>

<template>
  <div class="flex flex-col gap-2">
    <TaskRow
      v-for="task in tasks"
      :key="task.id"
      :id="task.id"
      :title="task.title"
      :priority="task.priority"
      :completed="task.completed"
      @toggle="toggleTask(task.id)"
    />
  </div>
</template>
