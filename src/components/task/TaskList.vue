<script setup lang="ts">
import { ref } from 'vue'
import TaskRow from './TaskRow.vue'

const tasks = ref([
  { title: 'Buy coffee beans', priority: 'high' as const, completed: false },
  { title: 'Finish presentation draft', priority: 'medium' as const, completed: false },
  { title: 'Water plants', priority: 'low' as const, completed: false },
  { title: 'Call doctor for appointment', priority: undefined, completed: true },
])
</script>

<template>
  <div class="flex flex-col gap-2">
    <TaskRow
      v-for="(task, index) in tasks"
      :key="index"
      :title="task.title"
      :priority="task.priority"
      :completed="task.completed"
      @toggle="task.completed = !task.completed"
    />
  </div>
</template>
