const { User, EmailConfirmation } = require("../models");
const { sendConfirmationEmail } = require("../services/emailService");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, niveau, filiere } = req.body;

    // Vérifier si email existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      niveau,
      filiere
    });

    // Générer un code de confirmation à 6 chiffres
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Sauvegarder ou mettre à jour le code de confirmation
    const [emailConf, created] = await EmailConfirmation.findOrCreate({
      where: { email },
      defaults: { code, verified: false }
    });
    if (!created) {
      emailConf.code = code;
      emailConf.verified = false;
      await emailConf.save();
    }

    // Envoyer l'email avec le code de confirmation
    await sendConfirmationEmail(email, code);

    return res.status(201).json({ message: "Compte créé, code envoyé à votre email." });

  } catch (error) {
    console.error("Erreur signup:", error);
    return res.status(500).json({ message: "Erreur lors de la création du compte", error });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Chercher l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérifier le mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect." });
    }

    // Ici tu peux générer un token JWT ou autre selon ton système d’authentification
    // Par exemple (si tu utilises JWT) :
    // const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: "Connexion réussie." /*, token*/ });

  } catch (error) {
    console.error("Erreur signin:", error);
    return res.status(500).json({ message: "Erreur lors de la connexion", error });
  }
};