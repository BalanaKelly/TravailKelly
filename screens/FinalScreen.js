import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, FlatList, Dimensions,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 

const screenWidth = Dimensions.get('window').width;

const carouselImages = [
  { id: '1', uri: 'https://img.freepik.com/photos-gratuite/groupe-cinq-etudiants-africains-passant-du-temps-ensemble-campus-cour-universite-amis-afro-noirs-etudiant-theme-education_627829-6007.jpg' },
  { id: '2', uri: 'https://img.freepik.com/photos-gratuite/groupe-cinq-etudiants-africains-passant-du-temps-ensemble-campus-cour-universite-amis-afro-noirs-etudiant-theme-education_627829-6007.jpg' },
  { id: '3', uri: 'https://img.freepik.com/photos-gratuite/groupe-cinq-etudiants-africains-passant-du-temps-ensemble-campus-cour-universite-amis-afro-noirs-etudiant-theme-education_627829-6007.jpg' },
];

const FinalScreen = () => {
  const navigation = useNavigation();

  const handlePrev = () => navigation.navigate('HomeScreen');
  const handleSignUp = () => navigation.navigate('SignUp');
  /* const handleSignIn = () => navigation.navigate('SignIn'); */
  const handleLogoClick = () => navigation.navigate('IntroScreen');

  return (
    <View style={styles.container}>
      <Navbar/>
      {/* Délimitation */}
      <View style={styles.separator} />

      {/* Contenu principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Prépare-toi aux examens, réussis sans stress !</Text>
        <Text style={styles.subtitle}>Quiz interactifs pour le Bac, concours et plus encore.</Text>

        {/* Illustration principale */}
        <Image
          source={{ uri: 'https://img.freepik.com/photos-gratuite/collegues-plan-moyen-posant-ensemble_23-2148950574.jpg?ga=GA1.1.62171055.1749662113&semt=ais_hybrid&w=740' }}
          style={styles.heroImage}
        />

        {/* CTA */}
        <TouchableOpacity style={styles.ctaButton} onPress={handleSignUp}>
          <Text style={styles.ctaText}>Commencer maintenant</Text>
        </TouchableOpacity>

        {/* Liste déroulante simulée */}
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>
            📘 Sélectionne ton objectif : Baccalauréat, Concours, Collège...
          </Text>
        </View>

        {/* Carrousel d'images */}
        <FlatList
          data={carouselImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.carouselImage} />
          )}
          style={styles.carousel}
        />
      </ScrollView>

      
      <Footer />

      {/* Bouton Prev */}
      <TouchableOpacity style={styles.prevButton} onPress={handlePrev}>
        <Text style={styles.prevText}>Prev</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },

  content: {
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  heroImage: {
    width: 250,
    height: 150,
    marginBottom: 20,
  },

  ctaButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },

  ctaText: {
    color: '#fff',
    fontSize: 16,
  },

  dropdown: {
    marginBottom: 20,
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 6,
  },

  dropdownText: {
    fontSize: 15,
  },

  carousel: {
    marginBottom: 20,
  },

  carouselImage: {
    width: screenWidth * 0.2,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  prevButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },

  prevText: {
    color: '#007bff',
    fontSize: 16,
  },
});