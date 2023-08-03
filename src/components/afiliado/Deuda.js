import React, { useEffect, useState } from 'react'
import { Text, ScrollView, Button, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Appbar, DataTable, IconButton, MD3Colors } from 'react-native-paper'
import axios from 'axios'
import LoginSVG from '../LoginSVG'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading';

import Env from 'react-native-config';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
import * as MercadoPagoService from '../mercadopago/mercadopago-service';




const Deuda = ({route}) => {

    
    

    const navigate = useNavigation();    
    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);

    const [isLoading, setLoading] = useState(false);
    const columnas = ["AÑO", "MES", "PAGO"]
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);    
    const urlPeriodosImpagos = "http://apiphp.federicofdz.com/api/deuda/";
    
    const [paymentResult, setPaymentResult] = useState(null);

    const startCheckout = async () => {
      try {
        const preferenceId = await MercadoPagoService.getPreferenceId('federicofdzok@gmail.com', {
          title: 'PAGAR',
          description: 'PAGARR',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 10,
        });

        //publicKey: Env.MP_PUBLIC_KEY,
        const payment = await MercadoPagoCheckout.createPayment({
          
          publicKey: 'TEST-2e9cf438-5ae8-4528-ab19-ad6a3058b32e',
          preferenceId,
        });

        setPaymentResult(payment);
      } catch (err) {
        alert('Something went wrong', err.message);
        console.log('Something went wrong', err.message);
      }
    };


    getFacturacion = async () => {

        axios({
          method: 'GET',
          url: `${urlPeriodosImpagos}${documento}`
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


// You should create the preference server-side, not client-side 
// but we show client-side for the sake of simplicity
export const getPreferenceId = async (payer, ...items) => {
  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=${Env.MP_ACCESS_TOKEN}`,
    {
      method: 'POST',
      body: JSON.stringify({
        items,
        payer: {
          email: payer,
        },
      }),
    }
  );

  const preference = await response.json();

  return preference.id;
};


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