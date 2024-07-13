const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./userModel')(sequelize, Sequelize);
const Project = require('./projectModel')(sequelize, Sequelize);
const Task = require('./taskModel')(sequelize, Sequelize);

User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = { User, Project, Task, sequelize };
