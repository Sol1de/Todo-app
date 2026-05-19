export interface Project {
  id: string
  name: string
  description: string
  icon: string
  createdAt: Date
}

export interface CreateProjectInput {
  name: string
  description?: string
  icon?: string
}
