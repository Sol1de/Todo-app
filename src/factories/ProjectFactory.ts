import type { CreateProjectInput, Project } from '@/models/Project'

export class ProjectFactory {
  static create(input: CreateProjectInput): Project {
    return {
      id: crypto.randomUUID(),
      name: input.name,
      description: input.description ?? '',
      icon: input.icon ?? 'lucide:folder-closed',
      createdAt: new Date(),
    }
  }
}
