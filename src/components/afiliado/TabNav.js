import * as React from 'react';
import { Button } from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Afiliado from './Afiliado'
import Facturaciones from './Facturaciones';
import Deuda from './Deuda';
import Pagos from './Pagos'
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import TurnosMedicos from './TurnosMedicos';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons/faNotesMedical'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';


const Tab = createMaterialBottomTabNavigator();

const TabNav = ({route}) => {

  const documento = (route.params.dni);
  const nombre = (route.params.nombre);
  const apellido = (route.params.apellido);

  return (
    
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#e91e63',
    }}
      
    >

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
          name="Deuda"
          component={Deuda} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}} 
          options={{            
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="money-bill" size={24} color="black" />
            ),
          }}
      />
      {/*
      <Tab.Screen 
          name="Turnos" 
          component={TurnosMedicos}           
          options={{            
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faNotesMedical} size={20} color="black" />              
          ),
        }}
      />
      
      
      */}
      
          
    </Tab.Navigator>
  );
}
export default TabNav;