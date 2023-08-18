import React, { useEffect, useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { Appbar, DataTable } from 'react-native-paper'
import axios from 'axios'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import Loading from '../Loading'


const urlControlDni = "http://apifdz.somee.com/api/afiliados/";


const Afiliado = ({route}) => {

    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
        
    
    //console.log(urlControlDni+documento)
    //console.log(afiliado)

    getUsers = async() => {
                  
      const resp = await fetch(urlControlDni+documento);
      const datos = await resp.json();
      //console.log([datos.data])
      setData([datos.data]);
      setLoading(true);
      //console.log(Array.isArray(data))
      
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

                        {Array.isArray(data) ? data.map((x,i) => {
                          return(
                          <DataTable.Row key={i} style={styles.tableRow}>                              
                              <DataTable.Cell style={styles.texto}><Text>{documento}</Text></DataTable.Cell>
                              <DataTable.Cell style={styles.texto}><Text>{x.codPlan}</Text></DataTable.Cell>
                              <DataTable.Cell>{x.desde}</DataTable.Cell>
                              {x.hasta == '' || x.hasta == null ?
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
                        )})
                      : null}
                              
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