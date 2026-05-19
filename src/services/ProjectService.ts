import type { CreateProjectInput, Project } from '@/models/Project'
import { ProjectFactory } from '@/factories/ProjectFactory'
import { addProject } from '@/stores/projectStore'

export class ProjectService {
  createProject(input: CreateProjectInput): Project {
    this.validateProject(input)
    const project = ProjectFactory.create(input)
    addProject(project)
    return project
  }

  validateProject(input: CreateProjectInput): void {
    if (!input.name.trim()) {
      throw new Error('Project name is required')
    }
  }
}
