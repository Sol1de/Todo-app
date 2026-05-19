<script setup lang="ts">
import { ref } from 'vue'
import { CircleCheck, Plus } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTaskService } from '@/composables/useTaskService'

const title = ref('')
const { addTask } = useTaskService()

function handleSubmit() {
  addTask({ title: title.value })
  title.value = ''
}
</script>

<template>
  <Card class="!flex-row items-center !gap-3 !py-3 px-4">
    <CircleCheck class="size-5 shrink-0 text-muted-foreground" />
    <Input
      v-model="title"
      placeholder="What needs to be done?"
      class="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
      @keydown.enter="handleSubmit"
    />
    <Button @click="handleSubmit" variant="ghost" size="icon" class="size-8 shrink-0">
      <Plus class="size-3.5" />
    </Button>
  </Card>
</template>
