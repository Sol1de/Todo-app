import type {CreateTaskInput, Task} from '@/models/Task'

export class TaskFactory {
    static create(input: CreateTaskInput): Task {
        return {
            id: crypto.randomUUID(),
            title: input.title,
            priority: input.priority ?? 'medium',
            projectId: input.projectId,
            completed: false,
            createdAt: new Date(),
        }
    }
}
