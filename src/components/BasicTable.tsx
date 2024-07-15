import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Forecast {
  from: string;
  to: string;
  symbol: string;
  precipitation: string;
  temperature: string;
  humidity: string;
  cloudiness: string;
}

interface BasicTableProps {
  forecast: Forecast[];
}

export default function BasicTable({ forecast }: BasicTableProps) {
  return (
    <TableContainer component={Paper} style={{ maxHeight: 277 }}>
      <Table stickyHeader aria-label="weather forecast table" style={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell>Time Period</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Precipitation</TableCell>
            <TableCell align="right">Temperature (K)</TableCell>
            <TableCell align="right">Humidity (%)</TableCell>
            <TableCell align="right">Cloudiness (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forecast.map((period, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {`${period.from} - ${period.to}`}
              </TableCell>
              <TableCell align="right">{period.symbol}</TableCell>
              <TableCell align="right">{period.precipitation}</TableCell>
              <TableCell align="right">{period.temperature}</TableCell>
              <TableCell align="right">{period.humidity}</TableCell>
              <TableCell align="right">{period.cloudiness}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
