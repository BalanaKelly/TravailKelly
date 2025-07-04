// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Configurer la connexion à la base de données PostgreSQL
const pool = new Pool({
    user: 'postgres', // Remplace par ton utilisateur DB
    host: 'localhost',
    database: 'iutplanner', // Base de données que tu as créée
    password: '', // Remplace par ton mot de passe DB
    port: 5432,
});

// Middleware pour vérifier le token JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Route pour l'inscription
app.post('/register', async (req, res) => {
    const { fullName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await pool.query(
            'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [fullName, email, hashedPassword, role]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'inscription');
    }
});

// Route pour l'authentification
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rowCount === 0) return res.status(400).send('Utilisateur non trouvé');

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).send('Mot de passe incorrect');

    const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

/// Route pour récupérer l'emploi du temps en fonction de la filière et du niveau
app.get('/schedules', authenticateToken, async (req, res) => {
  console.log('Requête reçue pour /schedules');
    const { filiere, niveau } = req.query;
    console.log(`Filière: ${filiere}, Niveau: ${niveau}`);
    try {
        const schedules = await pool.query(
            'SELECT * FROM schedules WHERE filiere = $1 AND niveau = $2',
            [filiere, niveau]
        );
        res.json(schedules.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des emplois du temps');
    }
});