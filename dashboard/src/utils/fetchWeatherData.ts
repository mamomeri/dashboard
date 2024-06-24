import axios from 'axios';

export const fetchWeatherData = async () => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: 'Guayaquil',
      mode: 'xml',
      appid: 'ac08715b3fe6bbe2cfc87bb73aeb607a',
    },
  });

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(response.data, 'application/xml');

  const times = xmlDoc.getElementsByTagName('time');
  const forecast = Array.from(times).map(time => ({
    from: time.getAttribute('from'),
    to: time.getAttribute('to'),
    symbol: time.getElementsByTagName('symbol')[0].getAttribute('name'),
    precipitation: time.getElementsByTagName('precipitation')[0].getAttribute('probability'),
    temperature: time.getElementsByTagName('temperature')[0].getAttribute('value'),
    humidity: time.getElementsByTagName('humidity')[0].getAttribute('value'),
  }));

  const sun = xmlDoc.getElementsByTagName('sun')[0];
  const sunrise = sun ? sun.getAttribute('rise') : null;
  const sunset = sun ? sun.getAttribute('set') : null;

  return { forecast, sunrise, sunset };
};
