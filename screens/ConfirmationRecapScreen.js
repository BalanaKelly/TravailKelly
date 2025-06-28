/* import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfirmationRecapScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  // Chargement des infos de l'utilisateur stockées temporairement
  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('pendingUser');
      if (userData) {
        setUserInfo(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const handleContinue = () => {
    // Rediriger vers l'écran de connexion
    navigation.navigate('SignInScreen');
  };

  if (!userInfo) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Inscription confirmée ✅</Text>

          <Text style={styles.label}>Nom complet :</Text>
          <Text style={styles.text}>{userInfo.fullName}</Text>

          <Text style={styles.label}>Email :</Text>
          <Text style={styles.text}>{userInfo.email}</Text>

          <Text style={styles.label}>Rôle :</Text>
          <Text style={styles.text}>{userInfo.role}</Text>

          {userInfo.niveau && (
            <>
              <Text style={styles.label}>Niveau :</Text>
              <Text style={styles.text}>{userInfo.niveau}</Text>
            </>
          )}

          {userInfo.filiere && (
            <>
              <Text style={styles.label}>Filière :</Text>
              <Text style={styles.text}>{userInfo.filiere}</Text>
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF0F7', // Fond similaire à SignUpScreen
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2A4D9B',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2A4D9B',
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { registerUser } from '../services/authService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ConfirmationRecapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    fullName,
    email,
    password,
    role,
    niveau,
    filiere
  } = route.params || {};

  const handleConfirmation = async () => {
    const result = await registerUser({
      fullName,
      email,
      password,
      role,
      niveau,
      filiere
    });

    if (result.success) {
      Alert.alert('Succès', 'Utilisateur enregistré avec succès !');
      // Redirection après succès
      navigation.navigate('SignIn'); // ou une autre page si tu préfères
    } else {
      Alert.alert('Erreur', result.error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.content}>
        <Text style={styles.title}>Récapitulatif de l'inscription</Text>
        <Text style={styles.label}>Nom complet : <Text style={styles.value}>{fullName}</Text></Text>
        <Text style={styles.label}>Email : <Text style={styles.value}>{email}</Text></Text>
        <Text style={styles.label}>Rôle : <Text style={styles.value}>{role}</Text></Text>
        {niveau && (
          <Text style={styles.label}>Niveau : <Text style={styles.value}>{niveau}</Text></Text>
        )}
        {filiere && (
          <Text style={styles.label}>Filière : <Text style={styles.value}>{filiere}</Text></Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleConfirmation}>
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

export default ConfirmationRecapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '500',
  },
  value: {
    fontWeight: 'normal',
    color: '#333',
  },
  button: {
    backgroundColor: '#2e86de',
    padding: 14,
    borderRadius: 8,
    marginTop: 28,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});