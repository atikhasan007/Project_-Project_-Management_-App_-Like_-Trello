import React, { createContext, useReducer } from 'react';
import { listReducer } from '../reducers/list';

export const ListContext = createContext();

const ListProvider = ({ children }) => {
  const [lists, dispatchListActions] = useReducer(listReducer, []);

  return (
    <ListContext.Provider value={{ lists, dispatchListActions }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListProvider;  // ✅ Exporting as default
