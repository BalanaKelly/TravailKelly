import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// Clés admin par niveau (à sécuriser en production !)
const validAdminKeys = {
  'Niveau 1': 'admin123',
  'Niveau 2': 'admin234',
  'Niveau 3': 'admin345',
};

export const registerUser = async ({ email, password, fullName, role, niveau, filiere, adminKey }) => {
  try {
    if (role === 'Responsable Académique') {
      const expectedKey = validAdminKeys[niveau];
      if (!expectedKey || adminKey !== expectedKey) {
        throw new Error('Clé admin incorrecte pour ce niveau');
      }
    }

    // Création de l'utilisateur dans Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Enregistrement des infos supplémentaires dans Firestore
    await setDoc(doc(db, "users", uid), {
      fullName,
      email,
      role,
      niveau,
      filiere,
      createdAt: new Date()
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur d'enregistrement Firebase :", error);
    return { success: false, error };
  }
};