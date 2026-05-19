import { reactive } from 'vue'
import type { Task } from '@/models/Task'
import { storageService } from '@/services/StorageService'
import appConfig from '@/config'

const state = reactive<{
  tasks: Task[]
}>({
  tasks: storageService.get<Task[]>(appConfig.TASKS_STORAGE_KEY) ?? [],
})

function persist(): void {
  storageService.set(appConfig.TASKS_STORAGE_KEY, state.tasks)
}

export function addTask(task: Task): void {
  state.tasks.push(task)
  persist()
}

export function getTasks(): Task[] {
  return state.tasks
}

export function getTasksByProject(projectId: string): Task[] {
  return state.tasks.filter(t => t.projectId === projectId)
}

export function toggleTask(taskId: string): void {
  const task = state.tasks.find(t => t.id === taskId)
  if (task) {
    task.completed = !task.completed
    persist()
  }
}

export { state as taskState }
