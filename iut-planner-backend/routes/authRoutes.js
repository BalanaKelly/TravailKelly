const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/authController');

// Route pour inscription
router.post('/signup', signup);

// Route pour connexion
router.post('/signin', signin);

module.exports = router;