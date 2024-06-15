// src/components/WeatherChart.tsx
import React from 'react';
import Plot from 'react-plotly.js';

interface WeatherChartProps {
  times: string[];
  temperatures: number[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ times, temperatures }) => {
  return (
    <div>
      <h2>Temperature Chart</h2>
      <Plot
        data={[
          {
            x: times,
            y: temperatures,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ title: 'Temperature Forecast' }}
      />
    </div>
  );
};

export default WeatherChart;
