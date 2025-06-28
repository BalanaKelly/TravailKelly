import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { Picker } from '@react-native-picker/picker';
import Navbar from '../components/Navbar';

const slides = [
  {
    key: '1',
    title: 'Étudiant',
    description: 'Consultez vos emplois du temps et suivez vos cours avec facilité.',
    image: require('../assets/etudiant.jpeg'),
  },
  {
    key: '2',
    title: 'Enseignant',
    description: 'Accédez aux emplois du temps de toutes les filières et niveaux.',
    image: require('../assets/enseignant.jpeg'),
  },
  {
    key: '3',
    title: 'Responsable Académique',
    description: 'Gérez les emplois du temps selon votre niveau et filière.',
    image: require('../assets/ra.jpeg'),
  },
];

const { width } = Dimensions.get('window');

export default function IntroScreen() {
  const navigation = useNavigation();

  const Banner = () => (
    <Animatable.View
      animation="fadeInDown"
      duration={1000}
      style={styles.bannerContainer}
    >
      <Image
        source={require('../assets/banniere.jpg')} // ⚠️ Ajoute une belle image ici
        style={styles.bannerImage}
      />
      
      <View style={styles.bannerTextContainer}>
        <Text style={styles.bannerTitle}>Planifiez votre réussite</Text>
        <Text style={styles.bannerSubtitle}>
          Accédez à vos emplois du temps facilement, où que vous soyez.
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('SignUpScreen')}
        >
          <Text style={styles.ctaButtonText}>Commencer</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {/* <Navbar
        role={null}
        onNavigateSignIn={() => navigation.navigate('SignInScreen')}
        onNavigateSignUp={() => navigation.navigate('SignUpScreen')}
      /> */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Banner />

        <Text style={styles.header}>Découvrez IUT Planner</Text>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.slidesWrapper}
        >
          {slides.map((item) => (
            <View key={item.key} style={[styles.slide, { width }]}>
              <Image source={item.image} style={styles.slideImage} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.hint}>Faites défiler les slides →</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSignIn}
            onPress={() => navigation.navigate('SignInScreen')}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7FF',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  bannerContainer: {
    width: '100%',
    backgroundColor: '#2A4D9B',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  bannerImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  bannerTextContainer: {
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#E0E0E0',
    textAlign: 'center',
    marginTop: 5,
    maxWidth: 300,
  },
  ctaButton: {
    marginTop: 15,
    backgroundColor: '#FDC500',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#2A4D9B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A4D9B',
    marginVertical: 20,
    textAlign: 'center',
  },
  slidesWrapper: {
    alignItems: 'center',
  },
  slide: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImage: {
    width: 250,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6D7A8A',
    paddingHorizontal: 15,
  },
  hint: {
    marginTop: 10,
    color: '#777',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
  },
  buttonSignUp: {
    backgroundColor: '#2A4D9B',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonSignIn: {
    backgroundColor: '#6C757D',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});