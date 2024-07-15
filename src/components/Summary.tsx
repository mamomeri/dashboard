import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import sunriseImage from '../../public/sunrise.jpeg';

interface SummaryProps {
  sunrise: string | null;
  sunset: string | null;
}

const formatDate = (dateTimeString: string | null): string => {
  if (!dateTimeString) return "N/A";
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('es-ES', options);
};

const formatTime = (dateTimeString: string | null): string => {
  if (!dateTimeString) return "N/A";
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return date.toLocaleTimeString('es-ES', options);
};

export default function Summary({ sunrise, sunset }: SummaryProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={sunriseImage}
          alt="Amanecer"
        />
        <CardContent>
          <Typography gutterBottom component="h2" variant="h6" color="primary">
            Amanecer
          </Typography>
          <Typography component="p" variant="h4">
            {formatTime(sunrise)}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            en {formatDate(sunrise)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
