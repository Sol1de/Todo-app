<script setup lang="ts">
import {ref} from 'vue'
import {useTaskService} from '@/composables/useTaskService'
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

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const title = ref('')
const priority = ref<'high' | 'medium' | 'low'>('medium')
const projectId = ref<string | null>(null)

const {addTask} = useTaskService()

function handleSubmit() {
  addTask({
    title: title.value,
    priority: priority.value,
    projectId: projectId.value ?? undefined,
  })
  emit('update:open', false)
  title.value = ''
  priority.value = 'medium'
  projectId.value = null
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
          <Input v-model="title" placeholder="What needs to be done?"/>
        </div>

        <div class="flex gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <label class="text-sm font-medium">Priority</label>
            <Select v-model="priority">
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
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="work">Work</SelectItem>
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
        <Button @click="handleSubmit">Add Task</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
