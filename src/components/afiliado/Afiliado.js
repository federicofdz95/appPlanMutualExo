import React, { useEffect, useState } from 'react'
import { ToastAndroid, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native'
import { Text } from 'react-native'
import { DataTable } from 'react-native-paper'
import { FlatList } from 'react-native'
import axios from 'axios'
import LoginSVG from '../LoginSVG'

const Afiliado = ({route}) => {

    const documento = (route.params.dni);
    const [isLoading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const urlControlDni = "http://apiphp.federicofdz.com/api/afiliados/";

    getUsers = async () => {
        try {
            const response = await axios.get(
              urlControlDni + documento
              ,{
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8',
                  "Access-Control-Allow-Origin": "*",
                }
               })
               .then((response) => {
                if (response.data.count === 0) {            
                  ToastAndroid.show("Afiliado inexistente", ToastAndroid.SHORT);
                } else {            
      
                  const dni = response.data.data[0].dni;
                  setApellido(response.data.data[0].apellido);
                  setNombre(response.data.data[0].nombre);
                  //ToastAndroid.show('OK', ToastAndroid.SHORT);
                  setLoading(false);
                  
                }
               });
            
               
      
          } catch (error) {
            ToastAndroid.show("Ha ocurrido un error: " + error, ToastAndroid.SHORT);
          }
    }

    useEffect(() => {
        setLoading(true);
        getUsers();
    }, []);

  return (
    <View style={styles.mainContainer}>

        
        <LoginSVG />        


        {isLoading ? <Text>Cargando...</Text> :
            (
                <Text>                  

                    <DataTable style={styles.container}>

                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title>DNI</DataTable.Title>
                            <DataTable.Title>NOMBRE</DataTable.Title>
                            <DataTable.Title>APELLIDO</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row style={styles.tableRow}>
                            <DataTable.Cell>{documento}</DataTable.Cell>
                            <DataTable.Cell>{nombre}</DataTable.Cell>
                            <DataTable.Cell>{apellido}</DataTable.Cell>
                        </DataTable.Row>
                              
                    </DataTable>
                    
                </Text>
            )}

        {/*
        <Button
            title="Volver"
            onPress={() =>
                navigation.navigate('login')
            }
        /> 
        */}               

    </View>
  )
}


const styles = StyleSheet.create({
  
    mainContainer: {    
      flex: 1,
      backgroundColor: '#f1f1f1',
    },
    containerSvg: {        
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'flex-start',      
      marginTop: 100,
      marginBottom: 30,
      height: 150
    },
    container: {    
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },  
    titulo: {
      fontSize: 80,
      color: '#34434D',
      fontWeight: 'bold',    
    },
    subTitulo: {
      fontSize: 15,
      color: '#000',   
      marginBottom: 20, 
    },
    txtDni:{    
      width: '80%',
      marginBottom: 30,    
      textAlign: 'center',
      justifyContent: 'center'
    },
    boton: {
      width: '80%',
      //height: '20%',    
    },
    tableHeader: {
        width:400,
        padding: 5,
        backgroundColor: '#DCDCDC',
        textAlign: 'center',
    },
    tableRow: {
        width:400,
        padding: 15,
        backgroundColor: '#FFF',
        textAlign: 'center',
    },
  });

export default Afiliado