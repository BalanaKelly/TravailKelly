// screens/Finalscreen.js

import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const FinalScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ceci est la derniere page</Text>
    </View>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({
  container: { 
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center'
  },
})