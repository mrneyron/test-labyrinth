import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useTypedSelector} from '../actions/useTypedSelector';
import {MOVES_SIZE} from '../types/game';

const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 50,
  lineHeight: '50px',
  padding: 8,
  paddingTop: 14
}));

const lineItems = (angles: number[]) => (
    <>
      <Grid item lg={0.5} sm={1} xs={2}/>
      {angles.map((angle, key) => (
        <Grid key={key} item lg={1} sm={2} xs={4}>
          <Item elevation={6}>
            <ArrowBackIcon color="primary" sx={{ fontSize: 40, transform: `rotate(${angle}deg)` }} />
          </Item>
        </Grid>
      ))}
      <Grid item lg={0.5} sm={1} xs={2}/>
    </>
  );

export default function Moves() {
  const {listMoves} = useTypedSelector(state => state);
  const angles1 = listMoves.slice(0, MOVES_SIZE / 2);
  const angles2 = listMoves.slice(MOVES_SIZE / 2, MOVES_SIZE);

  return (
    <Grid container spacing={2} sx={{marginTop: 3, justifyContent: "center"}}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{justifyContent: "center"}}>
              {lineItems(angles1)}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{justifyContent: "center"}}>
              {lineItems(angles2)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}