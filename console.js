// Class definition for an enhanced Task Manager
class TaskManager {
    constructor() {
        this.tasks = [];
        this.categories = new Set();
    }

    // Add a new task with more properties
    addTask(title, priority = 'medium', category = 'general', dueDate = null) {
        // Validate inputs
        if (!title.trim()) {
            throw new Error('Task title cannot be empty');
        }

        const task = {
            id: Date.now(),
            title,
            priority,
            category,
            dueDate: dueDate ? new Date(dueDate) : null,
            completed: false,
            createdAt: new Date(),
            tags: [],
            notes: ''
        };
        
        this.tasks.push(task);
        this.categories.add(category);
        return task;
    }

    // Add or update task notes
    addNotes(taskId, notes) {
        const task = this.getTaskById(taskId);
        task.notes = notes;
        return task;
    }

    // Add tags to a task
    addTags(taskId, ...tags) {
        const task = this.getTaskById(taskId);
        task.tags.push(...new Set(tags)); // Avoid duplicate tags
        return task;
    }

    // Get task by ID with error handling
    getTaskById(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }
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
        const task = this.getTaskById(taskId);
        task.completed = !task.completed;
        return task;
    }

    // Get all tasks filtered by completion status
    getTasks(showCompleted = true) {
        return this.tasks.filter(task => showCompleted || !task.completed);
    }

    // Get tasks by category
    getTasksByCategory(category) {
        return this.tasks.filter(task => task.category === category);
    }

    // Get high priority tasks
    getHighPriorityTasks() {
        return this.tasks.filter(task => task.priority === 'high');
    }

    // Get overdue tasks
    getOverdueTasks() {
        const now = new Date();
        return this.tasks.filter(task => 
            task.dueDate && task.dueDate < now && !task.completed
        );
    }

    // Search tasks by title or tags
    searchTasks(query) {
        const searchTerm = query.toLowerCase();
        return this.tasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) ||
            task.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Get all categories
    getCategories() {
        return Array.from(this.categories);
    }
}

// Example usage with new features
try {
    const taskManager = new TaskManager();

    // Add tasks with new properties
    taskManager.addTask(
        'Complete project proposal',
        'high',
        'work',
        '2024-12-31'
    );

    taskManager.addTask(
        'Review code changes',
        'medium',
        'development',
        '2024-12-29'
    );

    taskManager.addTask(
        'Update documentation',
        'low',
        'documentation'
    );

    // Add tags and notes to a task
    const tasks = taskManager.getTasks();
    if (tasks.length > 0) {
        const firstTask = tasks[0];
        taskManager.addTags(firstTask.id, 'urgent', 'q4', 'presentation');
        taskManager.addNotes(firstTask.id, 'Need to include Q4 metrics and 2025 projections');
    }

    // Display various filtered views
    console.log('All tasks:', taskManager.getTasks());
    console.log('Categories:', taskManager.getCategories());
    console.log('Work category tasks:', taskManager.getTasksByCategory('work'));
    console.log('Overdue tasks:', taskManager.getOverdueTasks());
    console.log('Search results for "code":', taskManager.searchTasks('code'));

} catch (error) {
    console.error('An error occurred:', error.message);
}
