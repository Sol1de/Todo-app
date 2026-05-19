import { reactive } from 'vue'
import type { Project } from '@/models/Project'

const state = reactive<{
  projects: Project[]
  activeProjectId: string | null
}>({
  projects: [],
  activeProjectId: null,
})

export function addProject(project: Project): void {
  throw new Error('Not implemented')
}

export function getProjects(): Project[] {
  throw new Error('Not implemented')
}

export function setActiveProject(projectId: string): void {
  throw new Error('Not implemented')
}

export { state as projectState }
