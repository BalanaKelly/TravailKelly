// config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Connexion à PostgreSQL avec Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

module.exports = sequelize;