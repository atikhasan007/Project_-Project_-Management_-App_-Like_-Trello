import React, { createContext, useReducer } from 'react'
import {taskReducer} from '../reducers/task'
export const TaskContext = createContext();

const TaskProvider = ({children}) => {
    const [tasks, dispatchTaskActions] = useReducer(taskReducer, [])
  return (
    <TaskContext.Provider value={{tasks, dispatchTaskActions}}>
           {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider
