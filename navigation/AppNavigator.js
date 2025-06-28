import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from '../screens/IntroScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { Image, TouchableOpacity } from 'react-native'
import SignInScreen from '../screens/SignInScreen';
import ConfirmationCodeScreen from '../screens/ConfirmationCodeScreen';
import ConfirmationRecapScreen from '../screens/ConfirmationRecapScreen';
import DashboardStudent from '../screens/DashboardStudent';
import  DashboardTeacher from '../screens/DashboardTeacher';
import DashboardAdmin from '../screens/DashboardAdmin';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="IntroScreen">
      <Stack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
  name="SignUpScreen"
  component={SignUpScreen}
  options={({ navigation }) => ({
    headerTitle: () => (
      <TouchableOpacity onPress={() => navigation.navigate('IntroScreen')}>
        <Image
          source={require('../assets/logo.jpeg')} // ou ton chemin réel
          style={{ width: 120, height: 40, resizeMode: 'contain' }}
        />
      </TouchableOpacity>
    ),
  })}
/>
      {/* <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options= {{ title: "IUT-Planner" }}
    
      /> */}
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: "Connexion" }}/>
      <Stack.Screen name="ConfirmationCodeScreen" component={ConfirmationCodeScreen} />
      {/* <Stack.Screen name="ConfirmationRecapScreen" component={ConfirmationRecapScreen} /> */}
      <Stack.Screen name="DashboardStudent" component={DashboardStudent} />
      <Stack.Screen name="DashboardTeacher" component={DashboardTeacher} />
      <Stack.Screen name="DashboardAdmin" component={DashboardAdmin} options={{ headerShown: false }}/>
      
    </Stack.Navigator>
  );
}