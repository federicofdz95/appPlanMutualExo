import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../components/LoginScreen';
import Control from '../components/Control';

const Stack = createStackNavigator();


const AuthStack = () => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>                  
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="control" component={Control} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default AuthStack