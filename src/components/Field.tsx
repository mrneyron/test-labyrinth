import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {pink} from '@mui/material/colors';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { styled } from '@mui/material/styles';

import {GAME_WIDTH, BOX_SIZE} from '../types/game';
import {useTypedSelector} from '../actions/useTypedSelector';

interface FieldProp {
  row: number;
  col: number;
  handleOnClick: (row: number, col: number) => void;
}

const Item = styled(Paper)(({theme}) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: BOX_SIZE,
  height: BOX_SIZE,
  lineHeight: `${BOX_SIZE}px`,
}));

export default function Field({row, col, handleOnClick}: FieldProp) {
  const {start, position, answer, isGameOver} = useTypedSelector(state => state);

  const isStart = () => (row === start[0] && col === start[1]);
  const thatPosition = () => (position[0] === row && position[1] === col)
  const isLose = () => (thatPosition() && JSON.stringify(answer) !== JSON.stringify(position));
  const isWin = () => (thatPosition() && JSON.stringify(answer) === JSON.stringify(position));
  const isRightAnswer = () => (isGameOver && !thatPosition() && answer[0] === row && answer[1] === col)

  return (
    <Grid onClick={() => handleOnClick(row, col)} item xs={12 / GAME_WIDTH}>
      <Item elevation={6} sx={{position: "relative", cursor: isGameOver ? 'not-allowed' : 'pointer' }}>
        {isStart() && (<FlagCircleIcon color="secondary" sx={{ fontSize: 60, position: "absolute", left: 12, top: 12 }} />)}
        {isLose() && (<CloseIcon sx={{ color: pink[500], fontSize: 60, position: "absolute", right: 12, top: 12 }} />)}
        {isWin() && (<CheckIcon color="primary" sx={{ fontSize: 60, position: "absolute", right: 12, top: 12 }} />)}
        {isRightAnswer() && (<DoneAllIcon color="primary" sx={{ fontSize: 60, position: "absolute", right: 12, top: 12 }} />)}
      </Item>
    </Grid>
  );
}