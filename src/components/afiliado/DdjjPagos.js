import React, { useEffect } from 'react'
import TopBar from './TopBar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native';
import axios from 'axios';
import Loading from '../Loading';
import { View, Picker, StyleSheet } from "react-native";





const DdjjPagos = ({route}) => {

    const [dni, setDni] = useState(null);
    const [anio, setAnio] = useState(null);
    const [mes, setMes] = useState(null);
    


    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);

    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date')
    const [show, setShow] = React.useState(false)
    const [text, setText] = React.useState('')
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    

    const urlPeriodosImpagos = "http://apiphp.federicofdz.com/api/deuda/";

    getPeriodosImpagos = () => {
        axios({
          method: 'GET',
          url: `${urlPeriodosImpagos}${documento}`
        })
        .then((res) => {
          
            setData(JSON.stringify(res.data.data));
            setLoading(true);
            //console.log(`${urlPeriodosImpagos}${documento}`)
            //console.log(res.data.count)
            //console.log((data))
          
        })
        .catch(err => ToastAndroid.show("Ha ocurrido un error: " + err, ToastAndroid.SHORT));
    }

    useEffect(() => {        
        getPeriodosImpagos();
    }, []);


    const onChange = (e, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let dia = tempDate.getDate()
      let mes = tempDate.getMonth().length==0 ? (tempDate.getMonth()+1) : (tempDate.getMonth()+1);
      mes = String(mes).padStart(2, '0');
      let anio = tempDate.getFullYear()

      let fDate =  `${dia}/${mes}/${anio}`;
      setText(fDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    
    

  return (
    <>               

        <SafeAreaProvider style={styles.mainContainer}>
            <View style={styles.mainContainer}>

                {!loading ? (
                  <>
                    <Loading/>
                  </>
                ):(
                  <>
                    <Text style={{
                        textAlign:'center',
                        marginBottom: 30,
                        fontSize: 18,
                    }}>DECLARACION DE PAGO
                    </Text>
                    
                    <TextInput
                        label='DNI'
                        style={styles.inputs}
                        value={documento}
                        onChangeText={dni => setDni(dni)}
                        maxLength={8}
                        keyboardType="numeric"
                        disabled
                    />
                    
                    
                    {/* SELECT con opciones de periodos IMPAGOS */}
                    


                    <TextInput
                        label='MONTO'
                        style={styles.inputs}
                        value={anio}
                        onChangeText={dni => setDni(dni)}
                        maxLength={8}
                        keyboardType="numeric"
                    />                                
                    

                    <Button
                      title='FECHA DE PAGO'                  
                      color={'green'}
                      onPress={() => showMode('date')}
                    />

                    <TextInput                    
                        style={styles.inputs}
                        value={text}                    
                        maxLength={11}                    
                        disabled
                    />

                                      

                    {show && (
                      <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        display='default'
                        onChange={onChange}
                      />
                    )}
                    
                    {/*
                    <Button 
                        icon="" 
                        mode="contained" 
                        style={styles.boton}
                        buttonColor="#6eaa5e"
                        onPress={() => chargeDdjj()}>
                        Ingresar
                    </Button>
                    */}
                  </>
                )}
                

            </View>
        </SafeAreaProvider>
    
    </>
  )
}

export default DdjjPagos

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
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  
  selectContainer: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      width: 300,
    },
    table: {      
      width: vw(110) ,
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
    inputs:{    
        width: vw(50) ,
        marginBottom: 30,    
        textAlign: 'center',
        justifyContent: 'center'
      },
      boton: {
        width: vw(50) ,
      },
  });