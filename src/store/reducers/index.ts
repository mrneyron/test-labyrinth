import {gameReducer} from "./gameReducer";

export const rootReducer = gameReducer;

export type RootState = ReturnType<typeof rootReducer>
