// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from './screens/IntroScreen';
import HomeScreen from './screens/HomeScreen';
import FinalScreen from './screens/FinalScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IntroScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="IntroScreen" 
          component={IntroScreen} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
        />
        <Stack.Screen
          name="FinalScreen"
          component={FinalScreen}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}