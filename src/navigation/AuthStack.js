import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../components/LoginScreen';
import TopBar from '../components/afiliado/TopBar';
import BottomBar from '../components/afiliado/BottomBar';

const Stack = createStackNavigator();
//const Stack = createNativeStackNavigator();


const AuthStack = () => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>                  
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="bottomBar" component={BottomBar} />          
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default AuthStack