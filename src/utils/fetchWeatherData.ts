import axios from 'axios';

// Definimos una interfaz para el formato del pronóstico del clima
export interface Forecast {
  from: string;
  to: string;
  symbol: string;
  precipitation: string;
  temperature: string;
  humidity: string;
  cloudiness: string; // Añadimos el atributo de nubosidad
  pressure: string; // Añadimos el atributo de presión
  feels_like: string; // Añadimos el atributo de sensación térmica
}

// Definimos una interfaz para el objeto de retorno
export interface WeatherData {
  forecasts: Forecast[];
  sunrise: string;
  sunset: string;
}

// Definimos la función fetchWeatherData como una función asíncrona para obtener datos del clima
export const fetchWeatherData = async (): Promise<WeatherData> => {
  // Hacemos una solicitud GET a la API de OpenWeatherMap para obtener datos del clima en formato XML
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: 'Guayaquil', // Ciudad para la cual queremos obtener el pronóstico
      mode: 'xml', // Especificamos que queremos los datos en formato XML
      appid: 'ac08715b3fe6bbe2cfc87bb73aeb607a', // Clave API para autenticar la solicitud
    },
  });

  // Creamos una instancia de DOMParser para analizar la respuesta XML
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(response.data, 'application/xml');

  // Imprimimos el tipo de xmlDoc
  console.log('Tipo de xmlDoc:', typeof xmlDoc); // "object"

  // Obtenemos todos los elementos <time> del XML y los convertimos en un array usando Array.from
  const times = Array.from(xmlDoc.getElementsByTagName('time'));

  // Mapeamos los elementos <time> para extraer la información relevante y formatearla
  const forecasts: Forecast[] = times.map(time => {
    // Obtenemos los atributos de cada elemento <time>
    const from = time.getAttribute('from') || ''; // Hora de inicio del periodo de pronóstico
    const to = time.getAttribute('to') || ''; // Hora de fin del periodo de pronóstico
    const symbol = time.getElementsByTagName('symbol')[0].getAttribute('name') || ''; // Símbolo del tiempo (e.g., "broken clouds")
    const precipitation = time.getElementsByTagName('precipitation')[0].getAttribute('probability') || '0'; // Probabilidad de precipitación
    const temperature = time.getElementsByTagName('temperature')[0].getAttribute('value') || ''; // Temperatura en Kelvin
    const humidity = time.getElementsByTagName('humidity')[0].getAttribute('value') || ''; // Humedad en porcentaje
    const cloudiness = time.getElementsByTagName('clouds')[0].getAttribute('all') || ''; // Nubosidad en porcentaje
    const pressure = time.getElementsByTagName('pressure')[0].getAttribute('value') || ''; // Presión atmosférica en hPa
    const feels_like = time.getElementsByTagName('feels_like')[0].getAttribute('value') || ''; // Sensación térmica en Kelvin

    // Retornamos un objeto con los datos formateados
    return {
      from, // Hora de inicio
      to, // Hora de fin
      symbol, // Símbolo del tiempo
      precipitation, // Probabilidad de precipitación
      temperature, // Temperatura
      humidity, // Humedad
      cloudiness, // Nubosidad
      pressure, // Presión
      feels_like, // Sensación térmica
    };
  });

  // Obtenemos el primer elemento <sun> del XML (solo hay uno) y extraemos las horas de amanecer y atardecer
  const sun = xmlDoc.getElementsByTagName('sun')[0];
  const sunrise = sun.getAttribute('rise') || ''; // Hora de amanecer
  const sunset = sun.getAttribute('set') || ''; // Hora de atardecer

  // Retornamos un objeto con el pronóstico y las horas de salida y puesta del sol
  return { forecasts, sunrise, sunset };
};

// Exportamos la función fetchWeatherData como el valor predeterminado del módulo
export default fetchWeatherData;
