import React, { useEffect, useState } from 'react'
import { ScrollView, ToastAndroid, View, VirtualizedList } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native'
import { Text } from 'react-native'
import { Appbar, DataTable } from 'react-native-paper'
import { FlatList } from 'react-native'
import axios from 'axios'
import LoginSVG from '../LoginSVG'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from './TopBar'





const Pagos = ({route}) => {

    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);
    
    const [isLoading, setLoading] = useState(false);
    const columnas = ["AÑO", "MES", "PAGO"]
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);

    const urlPagos = "http://apiphp.federicofdz.com/api/pagos/";

    getUsers = async () => {

        axios({
          method: 'GET',
          url: `${urlPagos}${documento}`
        })
        .then(res => {          
          setData(res.data.data);
          setCount(res.data.count);
          setLoading(true);
          //console.log(res.data.data)
        })
        .catch(err => console.log(err));
        
    }


    useEffect(() => {        
        getUsers();
    }, []);


    
  return (

    <>

      <TopBar data={afiliado} />

    <SafeAreaView style={styles.mainContainer}>
           
      
        <View style={styles.mainContainer}>                  

          {!isLoading ? 
          (
            <Text style={{
              textAlign:'center',
              width: vw(100),                  
  
            }}>Cargando...</Text>
          ):(

              <>                              
                              
                <ScrollView style={styles.scrollView}>
                                                
                    <DataTable style={styles.table}>
                      <DataTable.Header style={styles.tableHeader}>                          
                          <DataTable.Title>AÑO</DataTable.Title>
                          <DataTable.Title>MES</DataTable.Title>
                          <DataTable.Title>PAGÓ</DataTable.Title>                          
                        </DataTable.Header>

                        {data.map((x,i) => (
                          <DataTable.Row key={i} style={styles.tableRow}>                            
                            <DataTable.Cell>{x.anio}</DataTable.Cell>
                            <DataTable.Cell>{x.mes}</DataTable.Cell>
                            <DataTable.Cell>${x.pago}</DataTable.Cell>
                          </DataTable.Row>
                        ))}

                    </DataTable>

                    </ScrollView>

                    <Text style={styles.subTitulo}>TOTAL DE REGISTROS: {count}</Text>                

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
  });

export default Pagos