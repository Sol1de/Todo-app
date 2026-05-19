import { ref, computed } from 'vue'
import type { Task } from '@/models/task'
import { TaskFactory, type createTaskInput } from '@/factories/TaskFactory'

const tasks = ref<Task[]>([])
const activeFilter = ref<'all' | 'active' | 'completed'>('all')

export function useTaskService() {
    const filterdTasks = computed(() => {
        if(activeFilter.value === 'active') return tasks.value.filter(t => !t.completed)
        if(activeFilter.value === 'completed') return tasks.value.filter(t => t.completed)
        return tasks.value
    })

    function addTask(input: createTaskInput) {
        if(!input.title.trim()) return
        tasks.value.push(TaskFactory.create(input))
    }

    function toggleTask(id: string) {
        const task = tasks.value.find(t => t.id === id)
        if(task) task.completed = !task.completed
    }

    function setFilter(filter: 'all' | 'active' | 'completed') {
        activeFilter.value = filter
    }

    return { tasks: filterdTasks, activeFilter, addTask, toggleTask, setFilter }
}