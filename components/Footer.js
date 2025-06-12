// components/Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2025 Quizoria. Tous droits réservés.</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  footerText: {
    fontSize: 13,
    color: '#666',
  },
});