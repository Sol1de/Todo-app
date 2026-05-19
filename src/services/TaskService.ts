import type { CreateTaskInput, Task } from '@/models/Task'

export class TaskService {
  createTask(input: CreateTaskInput): Task {
    throw new Error('Not implemented')
  }

  validateTask(input: CreateTaskInput): boolean {
    throw new Error('Not implemented')
  }
}
