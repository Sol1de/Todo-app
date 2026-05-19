export type TaskPriority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  priority: TaskPriority
  projectId: string
  completed: boolean
  createdAt: Date
}

export interface CreateTaskInput {
  title: string
  priority?: TaskPriority
  projectId: string
}
