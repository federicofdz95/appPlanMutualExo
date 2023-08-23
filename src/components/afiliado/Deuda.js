import React, { useEffect, useState } from 'react'
import { Text, ScrollView, Button, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Appbar, DataTable, IconButton, MD3Colors } from 'react-native-paper'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';
import {API_IMPAGOS, MP_ACCESS_TOKEN, MP_MAIL, MP_PUBLIC_KEY} from "@env"




const Deuda = ({route}) => {  
    
    //console.log(MP_PUBLIC_KEY)

    const navigate = useNavigation();    
    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);

    const [isLoading, setLoading] = useState(false);
    const columnas = ["AÑO", "MES", "PAGO"]
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);    
        
    const [paymentResult, setPaymentResult] = useState(null);

    const token = global.tokenMutual;

    

    getFacturacion = () => {


      fetch(API_IMPAGOS+documento,{
        method: 'GET',
        headers:{
          "Content-type": "application/json",
          Authorization: `Bearer ${token}` 
        }          
      }).then(r=>r.json()).then(res=>{
        if(res){          
            //console.log(res)
            setData(res);            
            setCount(res.length)
            setLoading(true);            
            
        }
      }).catch(err => {
        console.log('error!: ' + err)
        //ToastAndroid.show("Afiliado inexistente", ToastAndroid.SHORT)
      });

      
        
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
                {count<=0 ? 
                (              
                    <>
                      <Text>ESTAS AL DÍA</Text>    
                      <Text>¡MUCHAS GRACIAS!</Text>    
                    </>
                ):(      
                  
                  <>                  
                    <ScrollView style={styles.scrollView}>
                      <ScrollView horizontal={true}>

                        <DataTable style={styles.table}>
                          
                          <DataTable.Header style={styles.tableHeader}>                          
                              <DataTable.Title>AÑO</DataTable.Title>
                              <DataTable.Title>MES</DataTable.Title>
                              <DataTable.Title>IMPORTE</DataTable.Title>
                              <DataTable.Title>ABONAR</DataTable.Title>                          
                            </DataTable.Header>

                            {data.map((x,i) => (
                              <View key={i}>                                                       
                                  <>
                                      {/* NO PAGADO */}
                                      <DataTable.Row key={i} style={{
                                        backgroundColor: '#fcb7af',
                                        height: vw(20)
                                      }}>
                                        <DataTable.Cell>{x.anio}</DataTable.Cell>
                                        <DataTable.Cell>{x.mes}</DataTable.Cell>
                                        <DataTable.Cell>${x.pago}</DataTable.Cell>                                    
                                        <DataTable.Cell>

                                            <Button
                                              title='PAGAR'
                                              onPress={() => {alert(x.pago)}}
                                            />
                                        
                                        </DataTable.Cell>
                                      </DataTable.Row>
                                  </>
                                                        
                              </View>                        
                            ))}

                          </DataTable>                          
                        
                        </ScrollView>

                       

                        {/*
                        <View>
                          <Payment
                            initialization={initialization}
                            customization={customization}
                            onSubmit={onSubmit}
                            onReady={onReady}
                            onError={onError}
                          />
                        </View>
                        */}

                    </ScrollView>
                  </>
                )}

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
      width: vw(100),
      //borderCollapse: 'separate',
      //borderSpacing: '0px 4px'
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

export default Deuda