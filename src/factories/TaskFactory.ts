import type { CreateTaskInput, Task } from '@/models/Task'

export class TaskFactory {
  static create(input: CreateTaskInput): Task {
    throw new Error('Not implemented')
  }
}
