import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Paper from '@mui/material/Paper';
import fetchWeatherData, { Forecast } from '../utils/fetchWeatherData';

interface WeatherChartProps {
  selectedVariable: string;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ selectedVariable }) => {
  const [data, setData] = useState<(string | number)[][]>([
    ["Hora", "Precipitación", "Humedad", "Nubosidad"],
  ]);

  useEffect(() => {
    const getData = async () => {
      const { forecasts }: { forecasts: Forecast[] } = await fetchWeatherData();

      let formattedData: (string | number)[][] = [];

      if (selectedVariable === "Todos") {
        formattedData = forecasts.map((forecast: Forecast) => {
          const date = new Date(forecast.from);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const time = `${hours}:${minutes}`;

          return [
            time,
            parseFloat(forecast.precipitation),
            parseFloat(forecast.humidity),
            parseFloat(forecast.cloudiness),
          ];
        });

        setData([
          ["Hora", "Precipitación", "Humedad", "Nubosidad"],
          ...formattedData
        ]);
      } else {
        formattedData = forecasts.map((forecast: Forecast) => {
          const date = new Date(forecast.from);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          const time = `${hours}:${minutes}`;

          let value = 0;
          switch (selectedVariable) {
            case "Precipitación":
              value = parseFloat(forecast.precipitation);
              break;
            case "Humedad":
              value = parseFloat(forecast.humidity);
              break;
            case "Nubosidad":
              value = parseFloat(forecast.cloudiness);
              break;
            default:
              value = 0;
              break;
          }

          return [
            time,
            value
          ];
        });

        setData([
          ["Hora", selectedVariable],
          ...formattedData
        ]);
      }
    };

    getData();
  }, [selectedVariable]);

  const options = {
    title: `${selectedVariable} vs Hora`,
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

