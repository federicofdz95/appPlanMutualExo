import * as React from 'react';
import { Button } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Afiliado from './Afiliado'
import Facturaciones from './Facturaciones';
import DdjjPagos from './DdjjPagos';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 


const Tab = createMaterialBottomTabNavigator();

const BottomBar = ({route}) => {

  const documento = (route.params.dni);
  const nombre = (route.params.nombre);
  const apellido = (route.params.apellido);

  return (
    <Tab.Navigator>
      <Tab.Screen 
          name="Afiliado" 
          component={Afiliado} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}} 
          options={{
            tabBarLabel: 'Afiliado',
            tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
      
      <Tab.Screen    
          name="Facturaciones"        
          component={Facturaciones} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}} 
          options={{
            tabBarLabel: 'Facturaciones',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="clipboard-list" size={24} color="black" />
            ),
          }}
      />

      <Tab.Screen    
          name="DDJJ Pagos"
          component={DdjjPagos} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}} 
          options={{
            tabBarLabel: 'DDJJ Pagos',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="money-bill" size={24} color="black" />
            ),
          }}
      />
      {/*
      <Tab.Screen    
          name="Pagos"        
          component={Pagos} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}} 
          options={{
            tabBarLabel: 'Pagos',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="money-bill" size={24} color="black" />
            ),
          }}
      />
      */}
      
          
    </Tab.Navigator>
  );
}
export default BottomBar;