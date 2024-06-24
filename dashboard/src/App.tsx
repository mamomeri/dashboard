import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'; // Grid estándar de MUI
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import './App.css';
import Indicator from './components/Indicator';
import { fetchWeatherData } from './utils/fetchWeatherData';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
function App() {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data.forecast);
      setSunrise(data.sunrise);
      setSunset(data.sunset);
    };

    getWeatherData();
  }, []);

  return (
    <>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ padding: '20px', content: "40px"}}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Indicator title='Precipitación' subtitle='Probabilidad' value={weatherData.length ? parseFloat(weatherData[0].precipitation) : 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Summary sunrise={sunrise ?? ''} sunset={sunset ?? ''} />
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <BasicTable forecast={weatherData} />
        </Grid>
        <Grid xs={12} lg={10}>
             <WeatherChart></WeatherChart>
             
      </Grid>
      <Grid xs={12} lg={2}>
             
             <ControlPanel />
      </Grid>
      </Grid>
      
     
    </>
  );
}

export default App;
