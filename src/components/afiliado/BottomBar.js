import * as React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Afiliado from './Afiliado'
import Facturaciones from './Facturaciones';
import DdjjPagos from './DdjjPagos';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import { Icon } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill'
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons/faNotesMedical'



const BottomBar = ({route}) => {

  const documento = (route.params.dni);
  const nombre = (route.params.nombre);
  const apellido = (route.params.apellido);

  return (
    <Drawer.Navigator 
      initialRouteName="Afiliado" 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      
    >
        
        <Drawer.Screen         
          name="Afiliado" 
          component={Afiliado} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}} 
          options={{
            tabBarLabel: 'Afiliado',
            drawerIcon: ({ color, size }) => (
            <FontAwesome name="user" size={20} color="black" />
          ),
        }}/>

        <Drawer.Screen 
          name="Facturaciones"        
          component={Facturaciones} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}}           
          options={{            
            drawerIcon: ({ color, size }) => (
              <FontAwesome5 name="clipboard-list" size={20} color="black" />
            ),
          }}
        />

        <Drawer.Screen 
          name="Declaracion de Pagos"        
          component={DdjjPagos} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}}           
          options={{            
            drawerIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faMoneyBill} size={20} color="black" />
            ),
          }}
        />

      <Drawer.Screen 
          name="Turnos Médicos"
          component={DdjjPagos} 
          initialParams={{dni: documento, apellido: apellido, nombre: nombre}}           
          options={{            
            drawerIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faNotesMedical} size={20} color="black" />              
            ),
          }}
        />

      </Drawer.Navigator>
  );
}
export default BottomBar;



const Drawer = createDrawerNavigator();



function CustomDrawerContent(route, props) {

  const navigation = useNavigation();
    

  const salir = () => {
    ToastAndroid.show('Sesión cerrada ', ToastAndroid.TOP);    
    navigation.navigate('login', {doc: ''});    
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem         
        label={'nombre'}
        onPress={() => salir()} 
        inactiveTintColor='red' 
        icon={() =>  <FontAwesomeIcon icon={faRightFromBracket} size={20} color="black"/> } 
      />

      <DrawerItemList {...props} />   

      <DrawerItem 
        label="Cerrar Sesion"  
        onPress={() => salir()} 
        inactiveTintColor='red' 
        icon={() =>  <FontAwesomeIcon icon={faRightFromBracket} size={20} color="black"/> } />
    </DrawerContentScrollView>
  );
}



