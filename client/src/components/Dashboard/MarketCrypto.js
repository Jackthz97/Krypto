import { Link } from 'react-router-dom';
import urlSpaceReplacer from '../../helpers/urlSpaceReplacer';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red,grey } from '@mui/material/colors';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const MarketCrypto = (props) => {
  let cleanedUrl = urlSpaceReplacer(props.id)


  return (


    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    
      <TableCell component="th" scope="row">
      <Link to={`/crypto/${cleanedUrl}`}><img src={props.image} alt={props.id} width="50"/></Link>
      </TableCell>
      <TableCell align="left"><Link to={`/crypto/${cleanedUrl}`}>{props.name}</Link></TableCell>
      <TableCell align="left"> <Link to={`/crypto/${cleanedUrl}`}>{props.current_price}</Link></TableCell>
      <TableCell align="left"><Link to={`/crypto/${cleanedUrl}`}>{props.price_change_percentage_24h}</Link></TableCell>
      <TableCell align="left"> <Link to={`/crypto/${cleanedUrl}`}>{props.last_updated}</Link></TableCell>
      <TableCell>{<Button aria-label="like"  onClick={() => props.setFav([props.id, props.image])}><FavoriteIcon style={{ color: red[500] }}/></Button>}</TableCell>

    </TableRow>

      


  
//       <div >
// <Grid container direction={"row"} columnGap={4} justifyContent={"start"}>
//         <Link to={`/crypto/${cleanedUrl}`}>
//           <Grid container direction={"row"}  columnGap={4} backgroundColor ='black'>
          
//           <Grid justifyContent={'start'} >
//               <img src={props.image} alt={props.id} width="50"/>
//           </Grid> 

//           <Grid>
//             <span> {props.name} </span>
//           </Grid>

//           <Grid>
//             <div>{props.current_price}</div>
//           </Grid>

//           <Grid>
//             <span>{Math.round(props.price_change_percentage_24h)}%</span>
//           </Grid>
//           <Grid>
//             <div>{(props.last_updated)} </div>
//           </Grid>
//           </Grid>   
//         </Link>
//             <Fab aria-label="like"  onClick={() => props.setFav([props.id, props.image])}><FavoriteIcon style={{ color: red[500] }}/></Fab>
//             </Grid>
//       </div>

  )
}

export default MarketCrypto