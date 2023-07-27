import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../components/LoginScreen';
import Control from '../components/Control';
import TopBar from '../components/afiliado/TopBar';

const Stack = createStackNavigator();
//const Stack = createNativeStackNavigator();


const AuthStack = () => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>                  
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="control" component={Control} />
          <Stack.Screen name="TopBar" component={TopBar} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default AuthStack