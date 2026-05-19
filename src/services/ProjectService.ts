import type { CreateProjectInput, Project } from '@/models/Project'

export class ProjectService {
  createProject(input: CreateProjectInput): Project {
    throw new Error('Not implemented')
  }

  validateProject(input: CreateProjectInput): boolean {
    throw new Error('Not implemented')
  }
}
