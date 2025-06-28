const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const db = {};

// Import des modèles
db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.EmailConfirmation = require('./EmailConfirmation')(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;