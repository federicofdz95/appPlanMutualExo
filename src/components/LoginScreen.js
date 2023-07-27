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

const urlControlDni = "http://apiphp.federicofdz.com/api/afiliados/";
const urlHisAfil = "http://apiphp.federicofdz.com/api/hisafil/";
const urlEmpresaOpcion = "http://apiphp.federicofdz.com/api/empresaopcion/";



const LoginScreen = ({navigation}) => {

  const [dni, setDni] = useState(null);
  const { dataApi, isLoading } = DataApi("http://apiphp.federicofdz.com/api/deudores");    
  const navigate = useNavigation();

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = (data) => {    
    buscarAfi(data.txtDni);
    //console.log(data.txtDni);
  };

  const showToast = () => {
    //ToastAndroid.show(dni, ToastAndroid.SHORT);
    //buscarAfi(dni);
    buscarAfi(dni);
  };


  const buscarAfi = async (dni) => {

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
          } else {            

            let dni = response.data.data[0].dni;
            let apellido = response.data.data[0].apellido;
            let nombre = response.data.data[0].nombre;
            //let afil = JSON.stringify(response.data.data[0])
            ToastAndroid.show('Hola ' + nombre, ToastAndroid.SHORT);                        
            navigation.navigate('bottomBar', {dni: dni, apellido: apellido, nombre: nombre})
            //navigate("/afiliado/" + datos);
            return true;
          }
         });
      
         

    } catch (error) {
      ToastAndroid.show("Ha ocurrido un error: " + error, ToastAndroid.SHORT);
    }
  };

  const buscarAfi_SinUso = (dni) => {
    if (dni !== "") {
      axios
        .get(urlControlDni + dni)
        .then((response) => {
          if (response.data.length === 0) {            
            ToastAndroid.show("Afiliado inexistente", ToastAndroid.SHORT);
          } else {
            console.log("res: " + response.data[0]);
            const nombre = response.data[0].nombre;
            const apellido = response.data[0].apellido;
            axios
              .get(urlHisAfil + dni)
              .then((response) => {
                if (response.data.length === 0) {
                  ToastAndroid.show("No hay registros en his_afil_os", ToastAndroid.SHORT);                  
                } else {
                  axios
                    .get(urlEmpresaOpcion + dni)
                    .then((response) => {
                      if (response.data.length === 0) {
                        
                        ToastAndroid.show("No hay registros en Empresa Opcion para " +
                        nombre +
                        " " +
                        apellido, ToastAndroid.SHORT);                        
                      } else {
                        ToastAndroid.show("Afiliado correcto", ToastAndroid.SHORT);
                        toast.success("Afiliado correcto", { duration: 2000 });
                        //window.location.href = "/afiliado/" + response.data[0].afi_nro_doc;
                        //console.log('ok -> ' + response.data[0].afi_nro_doc);                        
                        navigate("/afiliado/" + response.data[0].afi_nro_doc);
                      }
                    })
                    .catch((e) => {
                      ToastAndroid.show("Ha ocurrido un error1", ToastAndroid.SHORT);                      
                    });
                }
              })
              .catch((e) => {
                ToastAndroid.show("Ha ocurrido un error2", ToastAndroid.SHORT);
              });
          }
        })
        .catch((e) => {          
          //ToastAndroid.show("Ha ocurrido un error3", ToastAndroid.SHORT);
          ToastAndroid.show(e, ToastAndroid.SHORT);
          
        });
    } else {
      ToastAndroid.show("Ha ocurrido un error4", ToastAndroid.SHORT);
    }   

  };

  

  return (
    <View style={styles.mainContainer}>
      
      
      <LoginSVG />
      
      
      <View style={styles.container}>
        
          {/* 
          <Text style={styles.titulo}>Hola</Text>
          <Text style={styles.subTitulo}>App de la Mutual</Text>
          */}
          <TextInput
            label='DNI'
            style={styles.txtDni}
            value={dni}
            onChangeText={dni => setDni(dni)}
            maxLength={8}
            keyboardType="numeric"
          />

          <Button 
            icon="" 
            mode="contained" 
            style={styles.boton}
            buttonColor="#6eaa5e"
            onPress={() => showToast()}>
              Ingresar
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

export default LoginScreen
  