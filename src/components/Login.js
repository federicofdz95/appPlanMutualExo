import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text,View } from "react-native";
import LoginSVG from "./LoginSVG";
import { Button, TextInput } from "react-native-paper";
import DataApi from "./data/DataApi";
import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { ToastAndroid } from "react-native";
import { json } from "react-router-dom";


const urlControlDni = "http://apifdz.somee.com/api/login";



const Login = ({route}) => {

  const navigation = useNavigation(); 

  //const documento = (route.params.doc);  
  //if (documento==null) {setDni(null)};
  //console.log('doc: ' + documento);

  const [dni, setDni] = useState(null);
  const [pass, setPass] = useState(null);
  const [userOk, setUserOk] = useState(false);
  const [dniDisabled, setDniDisabled] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [textoBoton, setTextoBoton] = useState('Ingresar');

    

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = (data) => {    
    buscarAfi(data.txtDni);
    //console.log(data.txtDni);
  };

  const showToast = () => {
            
      buscarAfi(dni,pass);    
    
  };


  const buscarAfi = (dni,pass) => {

    if (dni===null || dni==='') { 
      ToastAndroid.showWithGravity(
        'Ingrese DNI',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    } 
    
    
    const data  = {"userDni": dni,"password": pass}

    //console.log(urlControlDni + ', ' + JSON.stringify(data));

    fetch(urlControlDni,{
      method: 'POST',
      headers:{
        'Content-type':'application/json',
        "Access-Control-Allow-Origin": "*",
      },
        body: JSON.stringify(data)
    }).then(r=>r.json()).then(res=>{
      if(res){          
          //console.log(res.token)
          //let dni = (res.dni).toUpperCase();          
          let nombre = (res.nombre).toUpperCase();
          let apellido = (res.apellido).toUpperCase();
          let usuario = (res.nombre + ' ' + res.apellido).toUpperCase();

          global.tokenMutual = res.token;

          ToastAndroid.show("Hola " + usuario, ToastAndroid.SHORT);
          navigation.navigate('drawerNav', {dni: dni, apellido: apellido, nombre: nombre});
      }
    }).catch(err => {
      //console.log('error: ' + err)
      ToastAndroid.show("Afiliado inexistente", ToastAndroid.SHORT)
    });

  };

  

  const ingresar = async (dni) => {

    if (dni===null || dni==='') { 
      ToastAndroid.showWithGravity(
        'Ingrese DNI',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }     

    try {
      const response = await axios.get(
        urlControlDni + dni
        ,{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
          }
         })
         .then((response) => {
          if (response.data.count === 0) {            
            ToastAndroid.show("Afiliado inexistente", ToastAndroid.SHORT);
            setTextoBoton('Validar');
            setPass(null);
            setUserOk(false);            
          } else {            

            let dni = response.data.data[0].dni;
            let apellido = response.data.data[0].apellido;
            let nombre = response.data.data[0].nombre;            
            ToastAndroid.show('Hola ' + nombre, ToastAndroid.SHORT);                        
            //navigation.navigate('bottomBar', {dni: dni, apellido: apellido, nombre: nombre})                        
            navigation.navigate('drawerNav', {dni: dni, apellido: apellido, nombre: nombre})                        
            return true;
          }
         });
      
         

    } catch (error) {
      ToastAndroid.show("Ha ocurrido un error: " + error, ToastAndroid.SHORT);
    }
  };

  

  return (
    <View style={styles.mainContainer}>
      
      
      <LoginSVG />
      
      
      <View style={styles.container}>
        
          <TextInput
            label='DNI'
            style={styles.txtDni}
            value={dni}
            onChangeText={dni => setDni(dni)}
            maxLength={20}
            keyboardType="numeric"
            disabled={dniDisabled}
          />

          
            <TextInput
              label='CONTRASEÑA'
              style={styles.txtDni}
              value={pass}
              onChangeText={pass => setPass(pass)}              
              secureTextEntry={secureTextEntry}
              right={<TextInput.Icon icon="eye" onPress={() => {
                  setSecureTextEntry(!secureTextEntry);
                  return false;
              }} />}
            />
                    
          <Button 
            icon="" 
            mode="contained" 
            style={styles.boton}
            buttonColor="#6eaa5e"
            onPress={() => showToast()}>
              {textoBoton}
          </Button>
        
      </View>
        
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
});

export default Login
  