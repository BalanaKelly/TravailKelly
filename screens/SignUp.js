import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Navbar />

      <View style={styles.form}>
        <Text style={styles.title}>Inscription</Text>

        <TextInput placeholder="Nom complet" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Mot de passe" secureTextEntry style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>

        <Text style={styles.til1}> OU </Text>

        <TouchableOpacity style={styles.buttongoogle}>
            <Text style={styles.buttonText}>Se connecter avec Google</Text>
         </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Déjà inscrit ? Se connecter</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  form: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: {
    backgroundColor: '#F9FAFB',
    width: '300px',
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonText: { 
    width: '250px',
    color: '#fff', 
    textAlign: 'center', 
    fontSize: 16,
    fontWeight: '600',
 },
  link: { 
    color: '#007bff', 
    textAlign: 'center', 
    marginTop: 10 
},
til1: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
},
buttongoogle:{
    
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#8B5CF6',
 },
});