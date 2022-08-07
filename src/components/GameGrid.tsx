import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import {useActions} from '../actions/useActions';
import {useTypedSelector} from '../actions/useTypedSelector';
import {GAME_WIDTH, GAME_HEIGHT, BOX_SIZE, MOVES_SIZE} from '../types/game';
import Field from './Field';

const matrix: number[][] = Array(GAME_WIDTH).fill(0).map(() => Array(GAME_HEIGHT).fill(0));

export default function GameGrid() {
  const {setAnswer, setPosition, setIsGameOver, setListMoves, setStart} = useActions();
  const {isGameOver, listMoves} = useTypedSelector(state => state);

  React.useEffect(() => {
    setListMoves(generateMoves());
  }, []);

  React.useEffect(() => {
    const pos = calculateAnswer(listMoves);
    setAnswer(pos);
  }, [listMoves]);

  const deleteFromArray = (array: number[], key: number) => {
    const newArray = array.filter((item) => item !== key);
    return newArray;
  };

  const generateMoves = () => {
    let canMoves = [0, 270];
    const array = [];
    for (let i = 0; i < MOVES_SIZE; i++) {
      const nowPosition = calculateAnswer(array);
      if (nowPosition[1] === 0) {
        canMoves.indexOf(270) === -1 && canMoves.push(270); 
        canMoves = deleteFromArray(canMoves, 90);
      }
      if (nowPosition[1] === GAME_HEIGHT - 1) {
        canMoves.indexOf(90) === -1 && canMoves.push(90); 
        canMoves = deleteFromArray(canMoves, 270);
      }

      if (nowPosition[0] === 0) {
        canMoves.indexOf(180) === -1 && canMoves.push(180);
        canMoves = deleteFromArray(canMoves, 0);
      }
      if (nowPosition[0] === GAME_WIDTH - 1) {
        canMoves.indexOf(0) === -1 && canMoves.push(0);
        canMoves = deleteFromArray(canMoves, 180);
      }

      if (nowPosition[0] !== 0 && nowPosition[0] !== GAME_HEIGHT - 1) { // row not 0 not GAME_HEIGHT - 1
        canMoves.indexOf(180) === -1 && canMoves.push(180);
        canMoves.indexOf(0) === -1 && canMoves.push(0);
      }
      if (nowPosition[1] !== 0 && nowPosition[1] !== GAME_WIDTH - 1) { // col not 0 not GAME_WIDTH -1
        canMoves.indexOf(270) === -1 && canMoves.push(270);
        canMoves.indexOf(90) === -1 && canMoves.push(90);
      }
      array.push(canMoves[Math.floor(Math.random() * canMoves.length)]);
    }
    return array;
  };

  const calculateAnswer = (array: number[]) => {
    let pos = [0, 0];
    for (let move of array) {
      switch(move) {
        case 0: pos = [pos[0] - 1, pos[1]]; // move left 0
        break;
        case 90: pos = [pos[0], pos[1] - 1]; // move up 90
        break;
        case 180: pos = [pos[0] + 1, pos[1]]; // move right 180
        break;
        default: pos = [pos[0], pos[1] + 1]; // move down 270
        break; 
      }
    }
    return pos;
  };

  const restartHandler = () => {
    setPosition([-1, -1]);
    setAnswer([-1, -1]);
    setIsGameOver(false);
    setStart([Math.floor(Math.random() * GAME_HEIGHT), Math.floor(Math.random() * GAME_WIDTH)])
    setListMoves(generateMoves());
  };

  const handleOnClick = (keyRow: number, keyItem: number) => {
    if (!isGameOver) {
      setIsGameOver(true);
      setPosition([keyRow, keyItem]);
    }
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} sx={{maxWidth: `${BOX_SIZE * GAME_WIDTH + 16}px`, margin: "auto"}}>
          {matrix.map((row, keyRow) => 
            row.map((item, keyItem) => (
              <Field key={keyRow + keyItem} row={keyRow} col={keyItem} handleOnClick={handleOnClick}/>
            ))
          )}
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{textAlign: "center"}}>
        <Button onClick={restartHandler} variant="contained">Restart</Button>
      </Grid>
    </Grid>
  );
}