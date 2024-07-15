import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import sunriseFoto from '../../public/sunrise.jpeg'; // Ajusta la ruta según sea necesario

interface SummaryProps {
  sunrise: string | undefined;
}

export default function Summary({ sunrise }: SummaryProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={sunriseFoto}
          alt="Amanecer"
        />
        <CardContent>
          <Typography gutterBottom component="h2" variant="h6" color="primary">
            Amanecer
          </Typography>
          <Typography component="p" variant="h4">
            {sunrise ? new Date(sunrise).toLocaleTimeString() : "No disponible"}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            en {sunrise ? new Date(sunrise).toLocaleDateString() : "No disponible"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
