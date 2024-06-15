// src/components/WeatherTable.tsx
import React from 'react';

interface WeatherTableProps {
  times: string[];
  temperatures: number[];
}

const WeatherTable: React.FC<WeatherTableProps> = ({ times, temperatures }) => {
  return (
    <div className="table">
      <h2>Temperature Table</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (°C)</th>
          </tr>
        </thead>
        <tbody>
          {times.map((time, index) => (
            <tr key={index}>
              <td>{time}</td>
              <td>{temperatures[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherTable;
