import * as React from 'react';
import { Button } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Afiliado from './afiliado/Afiliado'
import Facturaciones from './afiliado/Facturaciones';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import LoginScreen from './LoginScreen';



const Tab = createMaterialBottomTabNavigator();

function Control({navigation, route}) {

  const documento = (route.params.dni);

  return (
    <Tab.Navigator>
      <Tab.Screen 
          name="Usuario" 
          component={Afiliado} 
          initialParams={{dni: documento}} options={{
          tabBarLabel: 'Usuario',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen    
          name="Facturacion"        
          component={Facturaciones} 
          options={{
            tabBarLabel: 'Facturacion',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="money-bill" size={24} color="green" />
            ),
          }}
      />
      
      
          
    </Tab.Navigator>
  );
}
export default Control;