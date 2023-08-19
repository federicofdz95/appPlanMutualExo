import React, { useEffect, useState } from 'react'
import { ScrollView, ToastAndroid, View, VirtualizedList } from 'react-native'
import { Button, StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { Appbar, DataTable } from 'react-native-paper'
import { FlatList } from 'react-native'
import axios from 'axios'
import LoginSVG from '../LoginSVG'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import TopBar from './TopBar'
import Loading from '../Loading'
import {API_USUARIOS} from "@env"


const Usuarios = ({route}) => {

    const navigate = useNavigation();    
    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);

    const [isLoading, setLoading] = useState(false);
    const columnas = ["AÑO", "MES", "PAGO"]
    const [count, setCount] = useState(0);
    const [status, setStatus] = useState(0);
    const [data, setData] = useState([]);    

    const token = global.tokenMutual

    getFacturacion = async () => {
                 
      
      try {
        const response = await fetch(API_USUARIOS,{
          method: 'GET',
          headers:{
            "Content-type": "application/json",
            Authorization: `Bearer ${token}` 
          }          
        });
    
        //console.log('status code: ', response.status); // 👉️ 200

        if (response.status == 200) {
          const result = await response.json();
          setStatus(200)
          setLoading(true)
          setData(result)
          console.log(result)                  
        } else {
          console.log('No tiene los permisos suficientes')
          setLoading(true)
          //console.log(response);
          //throw new Error(`Error! status: ${response.status}`);          
        }        

      } catch (err) {
        console.log(err);
      }
      
                
    }


    useEffect(() => {        
        getFacturacion();
    }, []);


    
  return (
    
    <>
            

    <SafeAreaView style={styles.mainContainer}>
        
        <View style={styles.mainContainer}>
        
          {!isLoading ? 
            (              
                <Loading/>              
            ):(

              <>                                
                <ScrollView style={styles.scrollView}>
                  <ScrollView horizontal={true}>

                    <DataTable style={styles.table}>
                      
                      {status == 200 && 
                      <DataTable.Header style={styles.tableHeader}>
                          <DataTable.Title>DNI</DataTable.Title>
                          <DataTable.Title>USUARIO</DataTable.Title>                          
                          <DataTable.Title>CREADO</DataTable.Title>                          
                        </DataTable.Header>
                      }

                        {status==200 ? data.map((x,i) => (
                          <View key={i}>                                                  
                              <>
                                  {/* NO PAGADO */}
                                  <DataTable.Row key={i} style={{
                                    backgroundColor: '#fcb7af',
                                    height: vw(18),
                                    
                                  }}>
                                    <DataTable.Cell>{x.appDni}</DataTable.Cell>
                                    <DataTable.Cell>{x.appNombre}</DataTable.Cell>                                    
                                    <DataTable.Cell>{x.appCreacion}</DataTable.Cell>                                    
                                  </DataTable.Row>
                              </>
                                                      
                          </View>                        
                        ))
                      : <>
                        <Text style={styles.msgPermisos}>
                          No tiene los permisos suficientes
                        </Text>
                      </> }

                      </DataTable>
                    
                    </ScrollView>
                </ScrollView>
                

              </>

              )}      

        </View>

      
      </SafeAreaView>

    </>
  )
}


const styles = StyleSheet.create({
  
    mainContainer: {    
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f1f1f1',         
    },    
    scrollView: {      
      marginHorizontal: 10,
            
    },
    container: {    
      flex:1,
    },      
    table: {            
      width: vw(90),
      //height: vh(100),      
    } ,  
    tableHeader: {                
      textAlign: 'center',
      backgroundColor: '#DCDCDC',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      textAlignVertical: 'center',
      alignContent: 'center',         
    },
    tableRow: {                
        backgroundColor: '#FFF',        
    },
    titulo: {
      fontSize: 28,
      color: '#34434D',
      fontWeight: 'bold',
      textDecorationLine:'underline'
    },
    subTitulo: {
      fontSize: 14,
      color: '#000',   
      marginTop: 10, 
    },
    msgPermisos: {          
      textAlign: 'center'         
    }, 
  });

export default Usuarios