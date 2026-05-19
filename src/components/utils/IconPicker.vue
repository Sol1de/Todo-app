<script setup lang="ts">
import { computed, ref } from 'vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import * as icons from 'lucide-vue-next'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const allIcons = Object.keys(icons)
  .filter(key => key !== 'default' && key !== 'createLucideIcon' && typeof (icons as Record<string, unknown>)[key] !== 'string')
  .map(key => ({
    name: key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
    component: (icons as Record<string, unknown>)[key],
  }))

const search = ref('')
const itemsPerPage = 50
const page = ref(1)

const filteredIcons = computed(() => {
  if (!search.value)
    return allIcons
  return allIcons.filter(icon => icon.name.includes(search.value.toLowerCase()))
})

const visibleIcons = computed(() => {
  return filteredIcons.value.slice(0, page.value * itemsPerPage)
})

function loadMore() {
  if (page.value * itemsPerPage < filteredIcons.value.length)
    page.value++
}

const popoverOpen = ref(false)

const selectedIcon = computed(() => {
  if (!props.modelValue) return null
  const name = props.modelValue.replace('lucide:', '')
  return allIcons.find(icon => icon.name === name)
})

function selectIcon(icon: { name: string }) {
  emit('update:modelValue', `lucide:${icon.name}`)
  popoverOpen.value = false
}
</script>

<template>
  <Popover v-model:open="popoverOpen">
    <PopoverTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0">
        <component :is="selectedIcon?.component" v-if="selectedIcon" class="size-5" />
        <component :is="icons.Folder" v-else class="size-5" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="w-[320px]">
      <div class="flex flex-col gap-2">
        <Input v-model="search" placeholder="Search icon..." />

        <div
          class="grid max-h-[300px] grid-cols-6 gap-2 overflow-auto rounded-md border p-2"
          @scroll.passive="(e: Event) => {
            const el = e.target as HTMLElement
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) loadMore()
          }"
        >
          <div
            v-for="icon in visibleIcons"
            :key="icon.name"
            class="flex cursor-pointer items-center justify-center rounded border p-2 hover:bg-accent"
            @click="selectIcon(icon)"
          >
            <component :is="icon.component" class="size-5" />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
