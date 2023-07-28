import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, ToastAndroid } from 'react-native'
import { Appbar, Text } from 'react-native-paper'

const TopBar = ({data}) => {

  const navigation = useNavigation();

  const salir = () => {
    ToastAndroid.show('Sesión cerrada ', ToastAndroid.TOP);
    
    navigation.navigate('login', {doc: ''});    
  }
  
  return (
    <>
        <Appbar.Header >
            <Appbar.Content title={<Text style={styles.estilo}>{data}</Text>}/>
            <Appbar.Action icon="logout" onPress={() => salir()} />
        </Appbar.Header>
    </>
  )
}

const styles = StyleSheet.create({
  
  estilo: {    
    fontSize: 16,
  },      
  });

export default TopBar