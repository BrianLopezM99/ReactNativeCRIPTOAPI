import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, ActivityIndicator, ScrollView} from 'react-native';
import axios from 'axios';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false)

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        //Consultar api para obtener cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
        guardarCargando(true);
        //Ocultar spinner y mostrar resultado
        setTimeout(() => {
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarConsultarApi(false);
          guardarCargando(false)
        }, 3000)
      }
    };
    cotizarCriptomoneda();
  }, [consultarApi]);

  //mostrar spinner o resultado
  const componente = cargando ? <ActivityIndicator size="large" color="#5e49e2" /> : <Cotizacion resultado={resultado}/>
  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarConsultarApi={guardarConsultarApi}
          />
        </View>
        <View style={{marginTop: 40}}>
          {componente}
          </View>
        
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
