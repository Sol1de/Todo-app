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

defineProps<{
  open: boolean
}>()

defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
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
          <Input placeholder="What needs to be done?"/>
        </div>

        <div class="flex gap-2">
          <div class="flex flex-1 flex-col gap-2">
            <label class="text-sm font-medium">Priority</label>
            <Select default-value="medium">
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
            <Select>
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
        <Button>Add Task</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
