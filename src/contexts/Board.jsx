import React, { createContext, useReducer } from 'react'
import {boardReducer} from '../reducers/board'

export const BoardContext = createContext();

const BoardProvider = ({children}) => {

    const [boards, dispatchBoardActions] = useReducer(boardReducer, [])

  return (
    <BoardContext.Provider value={{boards,dispatchBoardActions}}>
         {children}
    </BoardContext.Provider>
  )
}

export default BoardProvider
