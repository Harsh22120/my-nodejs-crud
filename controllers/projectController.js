const { Project } = require('../models');

exports.createProject = async (req, res) => {
    try {
        const { name, description, userId } = req.body;
        const project = await Project.create({ name, description, userId });
        res.status(201).json({ message: 'Project created', project });
    } catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

exports.getProjectsByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const projects = await Project.findAll({ where: { userId } });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = await Project.findByPk(req.params.id);
        if (project) {
            project.name = name;
            project.description = description;
            await project.save();
            res.status(200).json({ message: 'Project updated', project });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) {
            await project.destroy();
            res.status(200).json({ message: 'Project deleted' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
};
