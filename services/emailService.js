export const sendConfirmationEmail = async (email, code) => {
  try {
    // Exemple avec fetch vers ton backend fictif
    const response = await fetch('https://ton-backend.com/api/send-confirmation-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
      throw new Error('Échec de l’envoi du code de confirmation.');
    }

    return true;
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return false;
  }
};