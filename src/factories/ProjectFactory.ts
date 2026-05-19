import type { CreateProjectInput, Project } from '@/models/Project'

export class ProjectFactory {
  static create(input: CreateProjectInput): Project {
    throw new Error('Not implemented')
  }
}
