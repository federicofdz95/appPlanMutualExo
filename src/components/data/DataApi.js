import { useEffect, useState } from "react";
import axios from "axios";

const DataApi = (url) => {
  
  
  const [datos, setDatos] = useState({
    data: null,
    isLoading: null,
    hasError: null,
  });

  const getData = async () => {
    setDatos({
      ...datos,
      isLoading: true,
    });

    
    //let { data } = res.data;
    //this.setState({ users: data });

    const resp = await fetch(url);            
    const data = await resp.json();

    setDatos({
      data,
      isLoading: false,
      hasError: null,
    });
  };

  useEffect(() => {
    getData();
  }, [url]);

  return {
    dataApi: datos.data,
    isLoading: datos.isLoading,
    hasError: datos.hasError,
  };
};

export default DataApi;
