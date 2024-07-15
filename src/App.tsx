import { useEffect, useState } from 'react';
// MUI
import Grid from '@mui/material/Grid'; // Grid estándar de MUI
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
  const [sunrise, setSunrise] = useState<string | undefined>(undefined);
  const [selectedVariable, setSelectedVariable] = useState<string>('Todos');

  useEffect(() => {
    const getWeatherData = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data.forecasts);
      setSunrise(data.sunrise);
    };

    getWeatherData();
  }, []);

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ padding: '20px', content: '40px' }}>
      <Grid item xs={12}>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Mi Dashboard</h2>
      </Grid>
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Indicator title='Precipitación' subtitle='Probabilidad %' value={weatherData.length ? parseFloat(weatherData[0].precipitation) : 0} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Indicator title='Presión Atmosférica ' subtitle='hPa' value={weatherData.length ? parseFloat(weatherData[0].pressure) : 0} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Indicator title='Sensación Térmica' subtitle='kelvin' value={weatherData.length ? parseFloat(weatherData[0].feels_like) : 0} />
        </Grid>
      </Grid>
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={3} md={3}>
          <Summary sunrise={sunrise} />
        </Grid>
        <Grid item xs={9} md={9}>
          <BasicTable forecast={weatherData} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <WeatherChart selectedVariable={selectedVariable} />
          </Grid>
          <Grid item xs={6}>
            <ControlPanel setSelectedVariable={setSelectedVariable} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
