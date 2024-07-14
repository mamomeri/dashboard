import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Paper from '@mui/material/Paper';
import fetchWeatherData, { Forecast } from '../utils/fetchWeatherData'; // Asegúrate de exportar la interfaz Forecast desde fetchWeatherData

const WeatherChart: React.FC = () => {
  const [data, setData] = useState<(string | number)[][]>([
    ["Hora", "Precipitación", "Humedad", "Nubosidad"],
  ]);

  useEffect(() => {
    const getData = async () => {
      const { forecasts }: { forecasts: Forecast[] } = await fetchWeatherData();

      // Formateamos los datos para el gráfico
      const formattedData = forecasts.map((forecast: Forecast) => {
        const date = new Date(forecast.from);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;
        
        return [
          time,
          parseFloat(forecast.precipitation),
          parseFloat(forecast.humidity),
          parseFloat(forecast.cloudiness), // Usamos el atributo 'cloudiness' para la nubosidad
        ];
      });

      setData(prevData => [...prevData, ...formattedData]);
    };

    getData();
  }, []);

  let options = {
    title: "Precipitación, Humedad y Nubosidad vs Hora",
    curveType: "function",
    legend: { position: "right" },
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Chart
        chartType="LineChart"
        data={data}
        width="100%"
        height="400px"
        options={options}
      />
    </Paper>
  );
}

export default WeatherChart;
