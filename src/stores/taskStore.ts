import { reactive } from 'vue'
import type { Task } from '@/models/Task'

const state = reactive<{
  tasks: Task[]
}>({
  tasks: [],
})

export function addTask(task: Task): void {
  throw new Error('Not implemented')
}

export function getTasks(): Task[] {
  throw new Error('Not implemented')
}

export function toggleTask(taskId: string): void {
  throw new Error('Not implemented')
}

export { state as taskState }
