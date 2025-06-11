// screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        {/* Texte principal */}
      <View style={styles.textContainer}>
        <Text style={styles.title}> Révise malin.{'\n'}</Text>
        <Text style={styles.title1}> Réussis mieux.{'\n'}{'\n'}</Text>
        <Text style={styles.subtitle}>
             Prépare tes examens ou tu veux, quand tu veux.{'\n'}
             Quiz interactifs, corrections instantanées, progrès visibles.{'\n'}{'\n'}
             Collège, lycée, concours? On est là.
        </Text>
      </View>
      
        {/* Pagination */}
      <View style={styles.pagination}>
        <View style={styles.dot}></View>
        <View style={[styles.dot, styles.activeDot]}></View>
        <View style={styles.dot}></View>
      </View>

        {/* Bouton Next */}
      <View style= {styles.buttonRow}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.prevText}>Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FinalScreen')}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>

      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  title1: {
    color: '#3B82F6',
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
  prevText: {
    color: '#OOO',
    fontSize: 16,
    fontWeight: '600'

  },
  nextButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  nextText: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '600',
    margin: 20,
  },
});