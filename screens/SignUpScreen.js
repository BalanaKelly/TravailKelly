import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { checkAdminKey } from '../services/adminKeyService';
import { Ionicons } from '@expo/vector-icons';

const FILIERES_BY_NIVEAU = {
  '1': ['GI', 'GEII', 'GBM', 'GRT'],
  '2': ['GI', 'GRT'],
  '3': ['GL', 'GRT', 'ASR'],
};

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [niveau, setNiveau] = useState('');
  const [filiere, setFiliere] = useState('');
  const [role, setRole] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const [availableFilieres, setAvailableFilieres] = useState([]);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [niveauError, setNiveauError] = useState('');
  const [filiereError, setFiliereError] = useState('');
  const [adminKeyError, setAdminKeyError] = useState('');

  useEffect(() => {
    if (niveau && role === 'Etudiant') {
      setAvailableFilieres(FILIERES_BY_NIVEAU[niveau] || []);
    } else {
      setAvailableFilieres([]);
      setFiliere(''); // Réinitialiser la filière si le niveau change
    }
  }, [niveau, role]);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setNiveau('');
    setFiliere('');
    setAdminKey('');
    setRoleError('');
    setNiveauError('');
    setFiliereError('');
    setAdminKeyError('');
  };

  const handleSubmit = async () => {
    let hasError = false;

    if (!fullName) {
      setFullNameError('Champ obligatoire');
      hasError = true;
    } else {
      setFullNameError('');
    }

    if (!email) {
      setEmailError('Champ obligatoire');
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Adresse email invalide');
        hasError = true;
      } else {
        setEmailError('');
      }
    }

    if (!password) {
      setPasswordError('Champ obligatoire');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Mot de passe trop court (min 6 caractères)');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!role) {
      setRoleError('Veuillez sélectionner un profil');
      hasError = true;
    } else {
      setRoleError('');
    }

    if (role === 'Etudiant') {
      if (!niveau) {
        setNiveauError('Veuillez sélectionner un niveau');
        hasError = true;
      } else {
        setNiveauError('');
      }

      if (!filiere) {
        setFiliereError('Veuillez sélectionner une filière');
        hasError = true;
      } else {
        setFiliereError('');
      }
    }

    if (role === 'RA') {
      if (!niveau) {
        setNiveauError('Veuillez sélectionner un niveau');
        hasError = true;
      } else {
        setNiveauError('');
      }

      const isValidKey = await checkAdminKey(niveau, adminKey);
      if (!isValidKey) {
        setAdminKeyError('Clé admin incorrecte pour ce niveau.');
        hasError = true;
      } else {
        setAdminKeyError('');
      }
    }

    if (hasError) return;

    // Redirection vers le bon tableau de bord
    if (role === 'RA') {
      navigation.navigate(`DashboardAdminN${niveau}`);
    } else if (role === 'Etudiant') {
      navigation.navigate(`DashboardEtudiant`);
    } else {
      // Gérer d'autres rôles si nécessaire
      navigation.navigate(`DashboardTeacher`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Créer un compte</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom complet"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            setFullNameError('');
          }}
        />
        {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Adresse email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mot de passe"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError('');
            }}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color="#1C3FAA"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <Text style={styles.label}>Profil</Text>
        <View style={styles.roleContainer}>
          {['Etudiant', 'Enseignant', 'RA'].map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.roleOption,
                role === r && styles.roleOptionSelected,
              ]}
              onPress={() => handleRoleSelect(r)}
            >
              <View
                style={[
                  styles.checkbox,
                  role === r && styles.checkboxSelected,
                ]}
              />
              <Text style={styles.roleText}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {roleError ? <Text style={styles.errorText}>{roleError}</Text> : null}

        {(role === 'Etudiant' || role === 'RA') && (
          <>
            <Text style={styles.label}>Niveau</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={niveau}
                onValueChange={(value) => {
                  setNiveau(value);
                  setNiveauError('');
                  setFiliere(''); // Réinitialiser la filière à chaque changement de niveau
                }}
                style={styles.picker}
              >
                <Picker.Item label="Sélectionner un niveau" value="" />
                <Picker.Item label="Niveau 1" value="1" />
                <Picker.Item label="Niveau 2" value="2" />
                <Picker.Item label="Niveau 3" value="3" />
              </Picker>
            </View>
            {niveauError ? <Text style={styles.errorText}>{niveauError}</Text> : null}

            {role === 'Etudiant' && availableFilieres.length > 0 && (
              <>
                <Text style={styles.label}>Filière</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={filiere}
                    onValueChange={(value) => {
                      setFiliere(value);
                      setFiliereError('');
                    }}
                    style={styles.picker}
                  >
                    <Picker.Item label="Sélectionner une filière" value="" />
                    {availableFilieres.map((f) => (
                      <Picker.Item key={f} label={f} value={f} />
                    ))}
                  </Picker>
                </View>
                {filiereError ? <Text style={styles.errorText}>{filiereError}</Text> : null}
              </>
            )}
          </>
        )}

        {role === 'RA' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Clé administrateur"
              secureTextEntry
              value={adminKey}
              onChangeText={(text) => {
                setAdminKey(text);
                setAdminKeyError('');
              }}
            />
            {adminKeyError ? (
              <Text style={styles.errorText}>{adminKeyError}</Text>
            ) : null}
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F9FF',
  },
  formContainer: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#1C3FAA',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    backgroundColor: '#fff',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#1C3FAA',
    marginRight: 8,
    borderRadius: 4,
  },
  checkboxSelected: {
    backgroundColor: '#1C3FAA',
  },
  roleOptionSelected: {
    backgroundColor: '#E7EEFF',
    borderRadius: 6,
  },
  roleText: {
    fontSize: 16,
    color: '#1C3FAA',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#1C3FAA',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: -10,
    marginBottom: 10,
  },
});