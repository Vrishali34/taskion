const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Build Task API', completed: true }
];

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API is running',
        status: 'success'
    });
});

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json({
        status: 'success',
        data: tasks
    });
});

// POST create new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            status: 'error',
            message: 'Title is required'
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        status: 'success',
        data: newTask
    });
});

// DELETE task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);

    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'Task not found'
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        status: 'success',
        data: deletedTask[0]
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// UPDATE task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({
            status: 'error',
            message: 'Task not found'
        });
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json({
        status: 'success',
        data: task
    });
});