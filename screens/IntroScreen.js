// screens/IntroScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Navbar/>
        
      {/* Zone pour le logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            source={require('../assets/logo.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Texte principal */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Prépare-toi à réussir{'\n'}
          Où que tu sois. Quand tu veux.
        </Text>
        <Text style={styles.subtitle}>
          Bienvenue sur Quizoria – ta plateforme de révision tout-en-un pour les concours et examens scolaires.
        </Text>
      </View>

      {/* Pagination */}
      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Bouton Next */}
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
      <Footer/>
    </View>
    
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 100,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#F97316',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    marginHorizontal: 7,
  },
  activeDot: {
    backgroundColor: '#8B5CF6',
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  nextText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
  },
});