import React, { useState } from "react";
import { Image, StyleSheet, Text,View } from "react-native";
import LoginSVG from "./LoginSVG";
import { Button, TextInput } from "react-native-paper";
import DataApi from "./data/DataApi";
import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { ToastAndroid } from "react-native";
const ulrControlDni = "http://localhost:84/api/control/";
const ulrHisAfil = "http://localhost:84/api/hisafil/";
const ulrEmpresaOpcion = "http://localhost:84/api/empresaopcion/";



const LoginScreen = () => {

  const [dni, setDni] = useState("");

  const { dataApi, isLoading } = DataApi("http://localhost:84/api/deudores");  
  const [dniOk, setDniOk] = useState("");
  const navigate = useNavigation();

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });

  const onSubmit = (data) => {    
    buscarAfi(data.txtDni);
    //console.log(data.txtDni);
  };

  const showToast = () => {
    ToastAndroid.show(dni, ToastAndroid.SHORT);
  };

  const buscarAfi = (dni) => {
    if (dni !== "") {
      axios
        .get(ulrControlDni + dni)
        .then((response) => {
          if (response.data.length === 0) {
            toast.error("No existe afiliado con ese DNI", { duration: 2000 });            
          } else {
            //console.log(response.data[0]);
            const nombre = response.data[0].afi_Nombre;
            const apellido = response.data[0].afi_Apellido;
            axios
              .get(ulrHisAfil + dni)
              .then((response) => {
                if (response.data.length === 0) {
                  toast.error("No hay registros en his_afil_os", {
                    duration: 2000,
                  });                  
                } else {
                  axios
                    .get(ulrEmpresaOpcion + dni)
                    .then((response) => {
                      if (response.data.length === 0) {
                        toast.error(
                          "No hay registros en Empresa Opcion para " +
                            nombre +
                            " " +
                            apellido,
                          {
                            duration: 2000,
                          }
                        );                        
                      } else {
                        toast.success("Afiliado correcto", { duration: 2000 });
                        //window.location.href = "/afiliado/" + response.data[0].afi_nro_doc;
                        console.log('ok -> ' + response.data[0].afi_nro_doc);                        
                        navigate("/afiliado/" + response.data[0].afi_nro_doc);
                      }
                    })
                    .catch((e) => {
                      toast.error("Ha ocurrido un error", { duration: 2000 });
                    });
                }
              })
              .catch((e) => {
                toast.error("Ha ocurrido un error", { duration: 2000 });
              });
          }
        })
        .catch((e) => {
          toast.error("Ha ocurrido un error", {
            duration: 2000,
            position: "top-center",
          });
        });
    } else {
      toast.error("Por favor ingrese el DNI", {
        duration: 800,
        position: "top-center",
      });      
    }   

  };

  if (dni==="154x") {

    const { dataApi: dataAfi, isLoading: loadFam } = DataApi(`http://localhost:84/api/planmutual/${32809511}`);
    //console.log('dato: ' + dataAfi)

  }
  
  

  return (
    <View style={styles.mainContainer}>
      
      <View style={styles.containerSvg}>
        <LoginSVG />
      </View>
      
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
  },
  boton: {
    width: '80%',
    //height: '20%',    
  },
});

export default LoginScreen
  