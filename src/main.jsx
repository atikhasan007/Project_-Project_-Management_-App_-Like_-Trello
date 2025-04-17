import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/Router.jsx";
import BoardProvider from './contexts/Board.jsx';
import ListProvider from './contexts/List.jsx';
import TaskProvider from './contexts/Task.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <BoardProvider>
          <ListProvider>
               <TaskProvider>
                   <RouterProvider router={router}/>
               </TaskProvider>
          </ListProvider>
       </BoardProvider>
  </StrictMode>,
)
