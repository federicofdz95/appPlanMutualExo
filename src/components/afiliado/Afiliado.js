import React, { useEffect, useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native'
import { Text } from 'react-native'
import { Appbar, DataTable } from 'react-native-paper'
import { FlatList } from 'react-native'
import axios from 'axios'
import LoginSVG from '../LoginSVG'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import TopBar from './TopBar'
import { Row, Rows, Table } from 'react-native-table-component'
import Loading from '../Loading'


const Afiliado = ({route}) => {

    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');


    const urlControlDni = "http://apiphp.federicofdz.com/api/afiliados/";

    getUsers = () => {

      axios({
        method: 'GET',
        url: `${urlControlDni}${documento}`
      })
      .then(res => {   
        
        if (res.data.count === 0) {            
          ToastAndroid.show("Afiliado inexistente", ToastAndroid.SHORT);
        } else {            
                    
          const dni = res.data.data[0].dni;
          setApellido(res.data.data[0].apellido);
          setNombre(res.data.data[0].nombre);          
          setData((res.data.data));
          //setCount(res.data.count);
          setLoading(true);          
          //console.log(JSON.stringify(res.data.data))
          
        }        
      })
      .catch(err => ToastAndroid.show("Ha ocurrido un error: " + err, ToastAndroid.SHORT));

    }

    useEffect(() => {        
        getUsers();
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

                    <Text style={{
                      textAlign:'center',
                      marginTop: 10,
                    }}>HISTORIAL</Text>
                    
                    <DataTable style={styles.table}>                        
                        <DataTable.Header style={styles.tableHeader}>                            
                            <DataTable.Title>DNI</DataTable.Title>
                            <DataTable.Title>PLAN</DataTable.Title>
                            <DataTable.Title>DESDE</DataTable.Title>
                            <DataTable.Title>HASTA</DataTable.Title>
                        </DataTable.Header>

                        {data.map((x,i) => (
                          <DataTable.Row key={i} style={styles.tableRow}>                              
                              <DataTable.Cell style={styles.texto}><Text>{documento}</Text></DataTable.Cell>
                              <DataTable.Cell style={styles.texto}><Text>{x.cod_plan}</Text></DataTable.Cell>
                              <DataTable.Cell>{x.desde}</DataTable.Cell>
                              {x.hasta == '' ?
                                (
                                  <>
                                    <DataTable.Cell style={{
                                      backgroundColor: '#b0f2c2',                                      
                                    }}>
                                      activo
                                    </DataTable.Cell>
                                  </>
                                ):(
                                  <>
                                    <DataTable.Cell>{x.hasta}</DataTable.Cell>
                                  </>
                              )}
                              
                          </DataTable.Row>
                        ))}
                              
                    </DataTable>
              
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
      width: vw(100) ,
      //height: vh(100),
      marginTop: 20,      
    },  
    tableHeader: {                
      textAlign: 'center',
      backgroundColor: '#DCDCDC',       
    },
    tableRow: {                
        backgroundColor: '#FFF',         
        height: vw(18), 
    },
    texto: {
      textAlign:'center',      
    }
  });

export default Afiliado