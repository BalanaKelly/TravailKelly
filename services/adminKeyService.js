// services/adminKeyService.js

// Table de correspondance des clés admin par niveau
const adminKeysByLevel = {
  '1': 'adminN1',
  '2': 'adminN2',
  '3': 'adminN3',
};

/**
 * Vérifie si la clé admin fournie correspond à celle attendue pour le niveau.
 * @param {string} niveau - Le niveau sélectionné ('1', '2', ou '3')
 * @param {string} key - La clé admin saisie par l'utilisateur
 * @returns {Promise<boolean>} true si valide, false sinon
 */
export const checkAdminKey = async (niveau, key) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const validKey = adminKeysByLevel[niveau];
      resolve(key === validKey);
    }, 500); // Simule un délai comme une requête réseau
  });
};