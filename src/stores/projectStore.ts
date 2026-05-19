import {reactive} from 'vue'
import type {Project} from '@/models/Project'
import {storageService} from '@/services/StorageService'
import appConfig from '@/config'

const state = reactive<{
    projects: Project[]
    activeProjectId: string | null
}>({
    projects: storageService.get<Project[]>(appConfig.PROJECTS_STORAGE_KEY) ?? [],
    activeProjectId: null,
})

function persist(): void {
    storageService.set(appConfig.PROJECTS_STORAGE_KEY, state.projects)
}

export function addProject(project: Project): void {
    state.projects.push(project)
    persist()
}

export function getProjects(): Project[] {
    return state.projects
}

export function setActiveProject(projectId: string): void {
    state.activeProjectId = projectId
}

export {state as projectState}
