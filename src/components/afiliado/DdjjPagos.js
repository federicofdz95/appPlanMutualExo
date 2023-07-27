import React from 'react'
import TopBar from './TopBar'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { Text, TextInput } from 'react-native-paper';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native';




const DdjjPagos = ({route}) => {

    const [dni, setDni] = useState(null);
    const [anio, setAnio] = useState(null);
    const [mes, setMes] = useState(null);
    


    const documento = (route.params.dni);
    const afiliado = (route.params.nombre + ' ' + route.params.apellido);

    const [date, setDate] = React.useState(new Date())
    const [mode, setMode] = React.useState('date')
    const [show, setShow] = React.useState(false)
    const [text, setText] = React.useState('Empty')

    const onChange = (e, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + tempDate.getMonth() + '/' + tempDate.getFullYear();
      setText(fDate);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    

  return (
    <>
        
        <TopBar data={afiliado} />

        <SafeAreaProvider style={styles.mainContainer}>
            <View style={styles.mainContainer}>

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

                <TextInput
                    label='PERIODO'
                    style={styles.inputs}
                    value={anio}                    
                    maxLength={10}                       
                />
                                

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
      flex:1,
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