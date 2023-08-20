import React, { useEffect, useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { DataTable } from 'react-native-paper'
import axios from 'axios'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import Loading from '../Loading'
import {API_AFILIADO} from "@env"
import { Row, Table } from 'react-native-table-component'




const Afiliado = ({route}) => {

    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);
    const [isLoading, setLoading] = useState(false);

    const [plan, setPlan] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');
    const [cont, setCont] = useState('');
    
    const [data, setData] = useState([]);

        
            
    getUsers = () => {
      
      fetch(API_AFILIADO+documento,{
        method: 'GET',        
      }).then(r=>r.json()).then(res=>{
        if(res){          

            //console.log('cont: ' + JSON.stringify(res));
            setPlan(res[0].codPlan);
            setDesde(res[0].desde);            
            res[0].hasta == null || res[0].hasta == '' ? setHasta('activo') : setHasta(res[0].hasta);
            //console.log(hasta);

            setCont(res.length);
            setData(res);
            setLoading(true);
        }
      }).catch(err => {
        console.log('error!: ' + err)
        ToastAndroid.show("Afiliado inexistente", ToastAndroid.SHORT)
      });

      /*
      const resp = await fetch(API_AFILIADO+documento);
      const datos = await resp.json();
      console.log(datos.length)
      setData([datos]);
      setLoading(true);
      //console.log(Array.isArray(data))
      */
      
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

                        {data ? 
                          <>

                            
                            <DataTable style={styles.table}>

                              <DataTable.Header style={styles.tableHeader}>                            
                                  <DataTable.Title>DNI</DataTable.Title>
                                  <DataTable.Title style={styles.tableRow}>
                                    <Text style={styles.texto}>{documento}</Text>
                                  </DataTable.Title>
                              </DataTable.Header>

                              <DataTable.Header style={styles.tableHeader}>                            
                                  <DataTable.Title>PLAN</DataTable.Title>
                                  <DataTable.Title style={styles.tableRow}>
                                    <Text style={styles.texto}>{plan}</Text>
                                  </DataTable.Title>
                              </DataTable.Header>


                              <DataTable.Header style={styles.tableHeader}>                            
                                  <DataTable.Title>DESDE</DataTable.Title>
                                  <DataTable.Title style={styles.tableRow}>
                                    <Text style={styles.texto}>{desde}</Text>
                                  </DataTable.Title>
                              </DataTable.Header>


                              <DataTable.Header style={styles.tableHeader}>                            
                                  <DataTable.Title>HASTA</DataTable.Title>
                                  {hasta == 'activo' ?
                                    (
                                      <>                                        
                                        <DataTable.Title style={{backgroundColor: '#b0f2c2'}}>
                                          <Text style={styles.texto}>activo</Text>
                                        </DataTable.Title>
                                      </>
                                    ):(
                                      <>
                                        <DataTable.Title style={styles.tableRow}>
                                          <Text>{hasta}</Text>
                                        </DataTable.Title>
                                      </>
                                  )}                                  
                                  
                              </DataTable.Header>

                            </DataTable>

                          </>
                        
                      : null}
                              
                    
              
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
      justifyContent: 'center'
    },  
    tableHeader: {                
      textAlign: 'center',
      backgroundColor: '#DCDCDC',       
    },
    tableRow: {                
        backgroundColor: '#FFF',         
        //height: vw(10), 
        textAlign:'center',
    },
    texto: {
      textAlign:'center',      
      fontSize: 16
    }
  });

export default Afiliado