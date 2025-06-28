// server.js

const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./models');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
const db = require('./models');

db.sequelize.sync({ alter: true }) // ← crée la table si elle manque
  .then(() => console.log("✅ Base de données synchronisée"))
  .catch((err) => console.error("❌ Erreur de sync Sequelize", err));
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});