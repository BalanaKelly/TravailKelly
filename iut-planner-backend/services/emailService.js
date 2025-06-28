const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,       // Adresse Gmail
    pass: process.env.EMAIL_PASS        // Mot de passe (ou App Password si 2FA activée)
  }
});

const sendConfirmationEmail = async (toEmail, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Votre code de confirmation - IUT Planner",
    text: `Bonjour,\n\nVoici votre code de confirmation : ${code}\n\nMerci de l'utiliser pour valider votre compte.\n\nL'équipe IUT Planner.`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };