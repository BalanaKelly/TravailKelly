// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // ConfirmationCodeScreen ou le chemin correct
const ConfirmationCode = require('../models/ConfirmationCode');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.post('/register', async (req, res) => {
  const { fullName, email, password, role, niveau, filiere } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Génère un code à 6 chiffres
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Enregistre le code temporaire en DB
    await ConfirmationCode.create({ email, code, createdAt: new Date() });

    // Envoie du mail
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // ou autre
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Code de confirmation',
      text: `Bonjour ${fullName},\n\nVotre code de confirmation est : ${code}\n\nIUT Planner`,
    });

    res.status(200).json({ message: 'Code envoyé par email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});