// src/App.tsx
import React, { useEffect, useState } from 'react';
import Indicators from './components/Indicators';
import WeatherChart from './components/WeatherChart';
import WeatherTable from './components/WeatherTable';
import { getWeatherData } from './services/weatherService';
import './App.css';

const App: React.FC = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [times, setTimes] = useState<string[]>([]);
  const [temperatures, setTemperatures] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData();
      const cityElement = data.querySelector('location > name');
      const countryElement = data.querySelector('location > country');
      const timezoneElement = data.querySelector('location > timezone');
      const latitudeElement = data.querySelector('location > location > latitude');
      const longitudeElement = data.querySelector('location > location > longitude');
      
      if (cityElement && countryElement && timezoneElement && latitudeElement && longitudeElement) {
        setCity(cityElement.textContent || '');
        setCountry(countryElement.textContent || '');
        setTimezone(timezoneElement.textContent || '');
        setLatitude(latitudeElement.textContent || '');
        setLongitude(longitudeElement.textContent || '');
      }

      const timeElements = data.querySelectorAll('forecast > time');
      const timesArray: string[] = [];
      const temperaturesArray: number[] = [];

      timeElements.forEach((timeElement: Element) => {
        const time = timeElement.getAttribute('from');
        const temperatureElement = timeElement.querySelector('temperature');
        const temperature = temperatureElement?.getAttribute('value');
        if (time && temperature) {
          timesArray.push(time);
          temperaturesArray.push(parseFloat(temperature));
        }
      });

      setTimes(timesArray);
      setTemperatures(temperaturesArray);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <Indicators city={city} country={country} timezone={timezone} latitude={latitude} longitude={longitude} />
      <WeatherChart times={times} temperatures={temperatures} />
      <WeatherTable times={times} temperatures={temperatures} />
    </div>
  );
};

export default App;
