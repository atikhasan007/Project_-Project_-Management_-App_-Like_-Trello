import React, { useContext } from 'react';
import { BoardContext } from "../contexts/Board";
import { ListContext } from '../contexts/List';   // ✅ Corrected
import { TaskContext } from '../contexts/Task';   // ✅ Corrected

const BoardItem = ({ board }) => {
  const { dispatchBoardActions } = useContext(BoardContext);
  const { dispatchListActions } = useContext(ListContext);   // ✅ Corrected
  const { dispatchTaskActions } = useContext(TaskContext);   // ✅ Corrected

  const removeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatchBoardActions({
      type: "REMOVE_BOARD",
      payload: board.id,
    });

    board.lists.forEach((listId) => {
      dispatchListActions({ type: "REMOVE_LIST", payload: listId });
    });

    board.tasks.forEach((taskId) => {
      dispatchTaskActions({ type: "REMOVE_TASK", payload: taskId });
    });
  };

  return (
    <div className='border-item'>
      <h5>{board.title}</h5>
      <button onClick={removeHandler}>X</button>
    </div>
  );
};

export default BoardItem;
