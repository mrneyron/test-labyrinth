import {GameAction, GameActionTypes} from "../../types/game";

export function setStart(start: number[]): GameAction {
  return {type: GameActionTypes.SET_START, payload: start}
}

export function setPosition(position: number[]): GameAction {
  return {type: GameActionTypes.SET_POSITION, payload: position}
}

export function setAnswer(answer: number[]): GameAction {
  return {type: GameActionTypes.SET_ANSWER, payload: answer}
}

export function setListMoves(listMoves: number[]): GameAction {
  return {type: GameActionTypes.SET_LIST_MOVES, payload: listMoves}
}

export function setIsGameOver(isGameOver: boolean): GameAction {
  return {type: GameActionTypes.SET_IS_GAME_OVER, payload: isGameOver}
}
