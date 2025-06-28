import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DashboardTeacher() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue dans le tableau de bord enseignant</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});