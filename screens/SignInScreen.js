import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Étudiant');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [niveau, setNiveau] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadSavedData = async () => {
      const savedEmail = await AsyncStorage.getItem('rememberedEmail');
      const savedRole = await AsyncStorage.getItem('rememberedRole');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
      if (savedRole) {
        setRole(savedRole);
      }
    };
    loadSavedData();
  }, []);

  const handleLogin = async () => {
    if (rememberMe) {
      await AsyncStorage.setItem('rememberedEmail', email);
      await AsyncStorage.setItem('rememberedRole', role);
    } else {
      await AsyncStorage.removeItem('rememberedEmail');
      await AsyncStorage.removeItem('rememberedRole');
    }

    if (role === 'Admin') {
      if (!niveau) {
        alert('Veuillez sélectionner un niveau');
        return;
      }
      navigation.navigate('DashboardAdmin', { niveau });
    } else if (role === 'Étudiant') {
      navigation.navigate('DashboardStudent');
    } else if (role === 'Enseignant') {
      navigation.navigate('DashboardTeacher');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>Connexion à IUT Planner</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="adresse@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Profil</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Étudiant" value="Étudiant" />
            <Picker.Item label="Enseignant" value="Enseignant" />
            <Picker.Item label="Admin" value="Admin" />
          </Picker>
        </View>

        {role === 'Admin' && (
          <>
            <Text style={styles.label}>Niveau</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={niveau}
                onValueChange={(itemValue) => setNiveau(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Sélectionnez le niveau" value="" />
                <Picker.Item label="Niveau 1" value="1" />
                <Picker.Item label="Niveau 2" value="2" />
                <Picker.Item label="Niveau 3" value="3" />
              </Picker>
            </View>
          </>
        )}

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkboxBox, rememberMe && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.link}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.link}>Pas encore inscrit ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#1E2A78',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#1E2A78',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: '#1E2A78',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});