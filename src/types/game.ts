export const GAME_WIDTH = 3;
export const GAME_HEIGHT = 3;
export const BOX_SIZE = 170;
export const MOVES_SIZE = 10;

export interface GameState {
  start: number[];
  position: number[];
  answer: number[];
  listMoves: number[];
  isGameOver: boolean;
}

export enum GameActionTypes {
  SET_START = 'SET_START',
  SET_POSITION = 'SET_POSITION',
  SET_ANSWER = 'SET_ANSWER',
  SET_LIST_MOVES = 'SET_LIST_MOVES',
  SET_IS_GAME_OVER = 'SET_IS_GAME_OVER',
}

interface SetStartAction {
  type: GameActionTypes.SET_START;
  payload: number[];
}

interface SetPositionAction {
  type: GameActionTypes.SET_POSITION;
  payload: number[];
}

interface SetAnswerAction {
  type: GameActionTypes.SET_ANSWER;
  payload: number[];
}

interface SetListMovesAction {
  type: GameActionTypes.SET_LIST_MOVES;
  payload: number[];
}

interface SetIsGameOverAction {
  type: GameActionTypes.SET_IS_GAME_OVER;
  payload: boolean;
}


export type GameAction = SetStartAction | SetPositionAction | SetAnswerAction | SetIsGameOverAction | SetListMovesAction;
