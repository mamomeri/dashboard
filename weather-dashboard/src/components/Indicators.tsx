// src/components/Indicators.tsx
import React from 'react';

interface IndicatorsProps {
  city: string;
  country: string;
  timezone: string;
  latitude: string;
  longitude: string;
}

const Indicators: React.FC<IndicatorsProps> = ({ city, country, timezone, latitude, longitude }) => {
  return (
    <div>
      <h2>Indicators</h2>
      <ul>
        <li>City: {city}</li>
        <li>Country: {country}</li>
        <li>Timezone: {timezone}</li>
        <li>Latitude: {latitude}</li>
        <li>Longitude: {longitude}</li>
      </ul>
    </div>
  );
};

export default Indicators;
