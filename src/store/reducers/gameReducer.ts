import {GameAction, GameActionTypes, GameState} from "../../types/game";

const initialState: GameState = {
  start: [0, 0],
  position: [-1, -1],
  answer: [-1, -1],
  listMoves: [],
  isGameOver: false,
}

export const gameReducer = (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionTypes.SET_START:
      return {...state, start: action.payload}
    case GameActionTypes.SET_POSITION:
      return {...state, position: action.payload}
    case GameActionTypes.SET_ANSWER:
      return {...state, answer: action.payload}
    case GameActionTypes.SET_LIST_MOVES:
      return {...state, listMoves: action.payload}
    case GameActionTypes.SET_IS_GAME_OVER:
      return {...state, isGameOver: action.payload}
    default:
      return state
  }
}
