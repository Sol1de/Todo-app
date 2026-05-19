<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {Input} from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {Button} from '@/components/ui/button'
import {Separator} from '@/components/ui/separator'
import {projectState} from '@/stores/projectStore'
import taskService from "@/services/TaskService.ts";
import type {TaskPriority} from "@/models/Task.ts";
import {ref} from "vue";

const taskTitle = ref('')
const taskPriority = ref<TaskPriority | ''>('')
const projectId = ref('')


defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

function handleCreate() {
  try {
    taskService.createTask({
      title: taskTitle.value,
      priority: taskPriority.value || undefined,
      projectId: projectId.value,
    })
    resetForm()
    emit('update:open', false)
  } catch (err) {
    console.error('error: ', err)
  }
}

function resetForm() {
  taskTitle.value = ''
  taskPriority.value = ''
  projectId.value = ''
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add task</DialogTitle>
      </DialogHeader>

      <Separator/>

      <div class="flex flex-col gap-5 py-2">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Task Name</label>
          <Input v-model="taskTitle" placeholder="What needs to be done?"/>
        </div>

        <div class="flex gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <label class="text-sm font-medium">Priority</label>
            <Select v-model="taskPriority">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select priority"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="flex flex-1 flex-col gap-2">
            <label class="text-sm font-medium">Project</label>
            <Select v-model="projectId">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select project"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="project in projectState.projects" :key="project.id" :value="project.id">
                  {{ project.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator/>

      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button @click="handleCreate">Add Task</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
