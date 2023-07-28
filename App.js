import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';



export default function App() {
  return (
    <NavigationContainer>
        <AuthStack/>
    </NavigationContainer>
  );
}

