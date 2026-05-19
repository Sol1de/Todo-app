import type { Task, Priority } from '@/types/task'

export interface createTaskInput { 
    title: string
    priority?: Priority
    projectId?: string
}

export const TaskFactory = { 
    create(input: createTaskInput): Task {
        return {
            id: crypto.randomUUID(),
            title: input.title.trim(),
            priority: input.priority ?? 'medium',
            completed: false,
            projectId: input.projectId ?? 'personal',
            createdAt: new Date(),
        }
    }
}