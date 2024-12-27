// Class definition for a basic Task Manager
class TaskManager {
    constructor() {
        this.tasks = [];
    }

    // Add a new task
    addTask(title, priority = 'medium') {
        const task = {
            id: Date.now(),
            title,
            priority,
            completed: false,
            createdAt: new Date()
        };
        this.tasks.push(task);
        return task;
    }

    // Remove a task by ID
    removeTask(taskId) {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index === -1) {
            throw new Error('Task not found');
        }
        return this.tasks.splice(index, 1)[0];
    }

    // Toggle task completion status
    toggleTaskStatus(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        task.completed = !task.completed;
        return task;
    }

    // Get all tasks filtered by completion status
    getTasks(showCompleted = true) {
        return this.tasks.filter(task => showCompleted || !task.completed);
    }

    // Get high priority tasks
    getHighPriorityTasks() {
        return this.tasks.filter(task => task.priority === 'high');
    }
}

// Example usage
try {
    // Initialize task manager
    const taskManager = new TaskManager();

    // Add some tasks
    taskManager.addTask('Complete project proposal', 'high');
    taskManager.addTask('Review code changes', 'medium');
    taskManager.addTask('Update documentation', 'low');

    // Display all tasks
    console.log('All tasks:', taskManager.getTasks());

    // Toggle status of a task
    const tasks = taskManager.getTasks();
    if (tasks.length > 0) {
        taskManager.toggleTaskStatus(tasks[0].id);
    }

    // Display high priority tasks
    console.log('High priority tasks:', taskManager.getHighPriorityTasks());

} catch (error) {
    console.error('An error occurred:', error.message);
}
