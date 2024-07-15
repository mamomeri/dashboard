import React, { useEffect, useState } from 'react';
// MUI
import Grid from '@mui/material/Grid'; // Grid estándar de MUI
import Typography from '@mui/material/Typography';
// UTILS
import { fetchWeatherData, Forecast } from './utils/fetchWeatherData';
// Mis componentes
import Indicator from './components/Indicator';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';


function App() {
  const [weatherData, setWeatherData] = useState<Forecast[]>([]);
  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);
  const [selectedVariable, setSelectedVariable] = useState<string>('Todos');

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data.forecasts);
      setSunrise(data.sunrise);
      setSunset(data.sunset);
    };

    getWeatherData();
  }, []);

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', padding: '20px' }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
            Mi Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Indicator title='Precipitación' subtitle='Probabilidad %' value={weatherData.length ? parseFloat(weatherData[0].precipitation) : 0} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Indicator title='Presión Atmosferica ' subtitle='hPa' value={weatherData.length ? parseFloat(weatherData[0].pressure) : 0} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Indicator title='Sensación Térmica' subtitle='kelvin' value={weatherData.length ? parseFloat(weatherData[0].feels_like) : 0} />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12} md={3}>
            <Summary sunrise={sunrise} sunset={sunset} />
          </Grid>
          <Grid item xs={12} md={9}>
            <BasicTable forecast={weatherData} />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={8}>
            <WeatherChart selectedVariable={selectedVariable} />
          </Grid>
          <Grid item xs={4}>
            <ControlPanel setSelectedVariable={setSelectedVariable} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
