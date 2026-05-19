import type {CreateTaskInput, Task} from '@/models/Task'
import {TaskFactory} from '@/factories/TaskFactory'
import {addTask} from '@/stores/taskStore'

class TaskService {
    createTask(input: CreateTaskInput): Task {
        this.validateTask(input)
        const task = TaskFactory.create(input)
        addTask(task)
        return task
    }

    validateTask(input: CreateTaskInput): void {
        if (!input.title.trim()) {
            throw new Error('Task title is required')
        }
        if (!input.projectId) {
            throw new Error('Project is required')
        }
    }
}

export default new TaskService()
