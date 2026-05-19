<script setup lang="ts">
import TaskRow from './TaskRow.vue'
import type {Task} from '@/models/Task'
import {toggleTask} from '@/stores/taskStore'

defineProps<{
  tasks: Task[]
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <TaskRow
      v-for="task in tasks"
      :key="task.id"
      :title="task.title"
      :priority="task.priority"
      :completed="task.completed"
      @toggle="toggleTask(task.id)"
    />
  </div>
</template>
