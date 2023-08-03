import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../components/Login';
import TopBar from '../components/afiliado/TopBar';
import DrawerNav from '../components/afiliado/DrawerNav';

const Stack = createStackNavigator();
//const Stack = createNativeStackNavigator();


const AuthStack = () => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}}>                  
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="drawerNav" component={DrawerNav} />          
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default AuthStack