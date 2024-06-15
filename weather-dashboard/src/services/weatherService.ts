// src/services/weatherService.ts
import axios from 'axios';

const API_KEY = 'ac08715b3fe6bbe2cfc87bb73aeb607a';
const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`;

export const getWeatherData = async () => {
  const response = await axios.get(BASE_URL, { responseType: 'document' });
  return response.data;
};
