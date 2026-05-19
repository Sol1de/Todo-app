<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import IconPicker from '@/components/utils/IconPicker.vue'
import { ref } from 'vue'

const selectedIcon = ref<string>()

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
        <DialogTitle>Create New Project</DialogTitle>
      </DialogHeader>

      <Separator />

      <div class="flex flex-col gap-5 py-2">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Project Name</label>
          <div class="flex gap-2">
            <IconPicker v-model="selectedIcon" />
            <Input placeholder="e.g., Website Redesign" class="flex-1" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Description (Optional)</label>
          <Textarea placeholder="Briefly describe the goal..." class="min-h-[100px]" />
        </div>
      </div>

      <Separator />

      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button>Create Project</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
