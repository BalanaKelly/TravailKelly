import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Assurez-vous de l'importer correctement

const Navbar = ({
  role,
  username,
  selectedFiliere,
  filieres = [],
  onFiliereChange,
  onSwitchToVisitor,
  onReturnToAdmin,
  isVisitorMode,
  onLogout,
}) => {
  return (
    <View style={styles.navbar}>
      <Image
        source={require('../assets/logo.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* VISITEUR (non connecté) */}
      {role === null && (
        <View style={styles.links}>
          <TouchableOpacity>
            <Text style={styles.link}>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={styles.link}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.link}>S’inscrire</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* AUTRES RÔLES */}
      {['student', 'teacher', 'ra'].includes(role) && (
        <View style={styles.links}>
          <Text style={styles.initial}>{username?.[0]}</Text>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.link}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ADMIN RA */}
      {role === 'ra' && (
        <View style={styles.links}>
          <Text style={styles.initial}>{username?.[0]}</Text>
          {isVisitorMode ? (
            <TouchableOpacity onPress={onReturnToAdmin}>
              <Text style={styles.link}>Revenir RA</Text>
            </TouchableOpacity>
          ) : (
            <>
              <Picker
                selectedValue={selectedFiliere}
                style={styles.picker}
                onValueChange={onFiliereChange}
              >
                {filieres.map(f => (
                  <Picker.Item key={f} label={f} value={f} />
                ))}
              </Picker>
              <TouchableOpacity onPress={onSwitchToVisitor}>
                <Text style={styles.link}>Mode Visiteur</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.link}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: '#2c3e50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  logo: {
    width: 140,
    height: 40,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    marginHorizontal: 10,
  },
  initial: {
    color: '#fff',
    backgroundColor: '#2980b9',
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
    marginRight: 10,
  },
  picker: {
    height: 30,
    width: 120,
    color: '#fff',
    backgroundColor: '#34495e',
    marginHorizontal: 10,
  },
});

export default Navbar;