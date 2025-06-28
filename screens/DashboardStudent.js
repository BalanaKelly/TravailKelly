// screens/DashboardEtudiant.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import { emplois } from '../services/data';

const DashboardStudent = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const niveau = user?.niveau;
  const filiere = user?.filiere;
  const prenom = user?.prenom;

  const emploiDuTemps = emplois[niveau]?.[filiere] || [];

  return (
    <View style={styles.container}>
      <Navbar
        role="etudiant"
        username={prenom}
        onLogout={() => {
          logout();
          navigation.replace('IntroScreen');
        }}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Bienvenue {prenom}</Text>
        <Text style={styles.subtitle}>Niveau {niveau} - Filière {filiere}</Text>
      </View>

      <FlatList
        data={emploiDuTemps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text style={styles.courseText}>{item.jour} - {item.heure}</Text>
            <Text style={styles.courseText}>{item.cours} avec {item.enseignant}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#777' }}>Aucun emploi du temps disponible.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2A4D9B' },
  subtitle: { fontSize: 16, color: '#555', marginTop: 4 },
  courseItem: {
    backgroundColor: '#E3EAFD',
    margin: 10,
    padding: 15,
    borderRadius: 8,
  },
  courseText: { fontSize: 16, color: '#34495E' },
});

export default DashboardStudent;