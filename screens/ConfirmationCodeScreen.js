import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmationCodeScreen() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const verifyCode = async () => {
    if (code !== '123456') {
      setError("Le code est incorrect. Veuillez réessayer.");
      return;
    }

    navigation.navigate('DashboardAdmin');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoiding}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Text style={styles.title}>Confirmation de votre compte</Text>
          <Text style={styles.subtitle}>Un code a été envoyé à votre adresse email.</Text>

          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="Entrez le code de confirmation"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            placeholderTextColor="#999"
          />

          {error !== '' && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={verifyCode}>
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles harmonisés avec SignUpScreen
const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: '#F4F6FA', // Même fond doux que SignUpScreen
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    padding: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // Android shadow
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A4D9B',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2A4D9B',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

/* import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { sendConfirmationEmail } from '../services/emailService';

const ConfirmationCodeScreen = ({ route, navigation }) => {
  const { email } = route.params; // Email passé en paramètre
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const generateAndSendCode = async () => {
    // Génère un code simple à 6 chiffres
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);

    // Appel à ta fonction d'envoi d'email
    const success = await sendConfirmationEmail(email, newCode);

    if (success) {
      Alert.alert('Succès', 'Le code de confirmation a été envoyé par email.');
    } else {
      Alert.alert('Erreur', "L'envoi du code a échoué, veuillez réessayer.");
    }
  };

  const verifyCode = () => {
    if (code === generatedCode) {
      Alert.alert('Succès', 'Code validé !');
      // Ici, tu peux naviguer vers la page suivante (ex: récap)
      navigation.navigate('ConfirmationRecap', { email });
    } else {
      Alert.alert('Erreur', 'Code incorrect.');
    }
  };

  // Au chargement du composant, on génère et envoie le code
  React.useEffect(() => {
    generateAndSendCode();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Entrez le code de confirmation envoyé à {email} :</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        placeholder="Code de confirmation"
        style={{ marginVertical: 10, borderWidth: 1, padding: 10 }}
      />
      <Button title="Valider le code" onPress={verifyCode} />
    </View>
  );
};

export default ConfirmationCodeScreen; */