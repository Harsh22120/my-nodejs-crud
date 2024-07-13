const { Task } = require('../models');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;
        const task = await Task.create({ title, description, status, projectId });
        res.status(201).json({ message: 'Task created', task });
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

exports.getTasksByProjectId = async (req, res) => {
    try {
        const projectId = parseInt(req.params.projectId);
        const tasks = await Task.findAll({ where: { projectId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findByPk(req.params.id);
        if (task) {
            task.title = title;
            task.description = description;
            task.status = status;
            await task.save();
            res.status(200).json({ message: 'Task updated', task });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.status(200).json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
