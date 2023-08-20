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
import {API_IMPAGOS, MP_ACCESS_TOKEN, MP_MAIL, MP_PUBLIC_KEY} from "@env"
import { Payment } from '@mercadopago/sdk-react';
import { initMercadoPago } from '@mercadopago/sdk-react';
initMercadoPago(MP_PUBLIC_KEY);


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

    const startCheckout = async () => {
      try {
        const preferenceId = await getPreferenceId(MP_MAIL, {
          title: 'PAGAR',
          description: 'PAGARR',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 10.0,
        });

        console.log({          
          publicKey: MP_PUBLIC_KEY,
          preferenceId,
        })

        const payment = await MercadoPagoCheckout.createPayment({          
          publicKey: MP_PUBLIC_KEY,
          preferenceId,
        });

        //console.log(payment)

        setPaymentResult(payment);
      } catch (err) {
        alert('Something went wrong', err.message);
        console.log('Something went wrong', err.message);
      }
    };

    // You should create the preference server-side, not client-side 
// but we show client-side for the sake of simplicity
const getPreferenceId = async (payer, ...items) => {
  
  
  const response = await fetch(
    `https://api.mercadopago.com/checkout/preferences?access_token=${MP_ACCESS_TOKEN}`,
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

    //console.log('id: ' + preference.id)
    return preference.id;
  };


  const preferenceId = getPreferenceId(MP_MAIL, {
    title: 'PAGAR',
    description: 'PAGARR',
    quantity: 1,
    currency_id: 'ARS',
    unit_price: 10.0,
  });
    
    const initialization = {
      amount: 100,
      preferenceId,
    };
    const customization = {
      paymentMethods: {
        ticket: "all",
        creditCard: "all",
        debitCard: "all",
        mercadoPago: "all",
      },
    };
    const onSubmit = async (
      { selectedPaymentMethod, formData }
    ) => {
      // callback llamado al hacer clic en el botón enviar datos
      return new Promise((resolve, reject) => {
        fetch("/process_payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((response) => {
            // recibir el resultado del pago
            resolve();
          })
          .catch((error) => {
            // manejar la respuesta de error al intentar crear el pago
            reject();
          });
      });
    };
    const onError = async (error) => {
      // callback llamado para todos los casos de error de Brick
      console.log(error);
    };
    const onReady = async () => {
      /*
        Callback llamado cuando el Brick está listo.
        Aquí puede ocultar cargamentos de su sitio, por ejemplo.
      */
    };
 


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

                        <TouchableOpacity onPress={startCheckout}>
                          <Text style={styles.text}>Start Payment</Text>
                        </TouchableOpacity>
                        
                        <Text style={styles.text}>Payment: {JSON.stringify(paymentResult)}</Text>      
                        
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