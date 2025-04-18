import React, { useState, useContext } from 'react';

import { BoardContext } from '../contexts/Board';
import { ListContext } from '../contexts/List';
import { TaskContext } from '../contexts/Task';

import AddItemForm from './AddItemForm';

const TaskCard = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const { dispatchBoardActions } = useContext(BoardContext);
  const { dispatchListActions } = useContext(ListContext);
  const { dispatchTaskActions } = useContext(TaskContext);

  const removeHandler = () => {
    dispatchTaskActions({
      type: "REMOVE_TASK",
      payload: task.id,
    });

    dispatchListActions({
      type: "REMOVE_TASK_ID_FROM_A_LIST",
      payload: {
        id: task.listId,
        taskId: task.id,
      },
    });

    dispatchBoardActions({
      type: "REMOVE_TASK_ID_FROM_A_BOARD",
      payload: {
        id: task.boardId,
        taskId: task.id,
      },
    });
  };

  const submitHandler = () => {
    dispatchTaskActions({
      type: "UPDATE_TASK_TITLE",
      payload: {
        id: task.id,
        title: taskTitle,
      },
    });
    setEditMode(false);
  };

  return (
    <div>
      {!editMode ? (
        <div onClick={() => setEditMode(true)} className="task-card">
          <p>{task.title}</p>
          <p onClick={(e) => { e.stopPropagation(); removeHandler(); }}>x</p>
        </div>
      ) : (
        <AddItemForm
          title={taskTitle}
          onChangeHandler={(e) => setTaskTitle(e.target.value)}
          setEditMode={setEditMode}
          submitHandler={submitHandler}
          listForm={false}
        />
      )}
    </div>
  );
};

export default TaskCard;
