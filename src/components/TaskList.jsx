import React, { useContext, useState } from 'react';
import { BoardContext } from '../contexts/Board';
import { ListContext } from '../contexts/List';
import { TaskContext } from '../contexts/Task';

import AddItem from './AddItem';
import AddItemForm from './AddItemForm';
import TaskCard from './TaskCard';

const TaskList = ({ list }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [editMode, setEditMode] = useState(false);

  const { tasks, dispatchTaskActions } = useContext(TaskContext);
  const { dispatchBoardActions } = useContext(BoardContext);
  const { dispatchListActions } = useContext(ListContext);

  const removeHandler = () => {
    dispatchListActions({
      type: 'REMOVE_LIST',
      payload: list.id,
    });

    list.tasks.forEach((taskId) => {
      dispatchTaskActions({
        type: 'REMOVE_TASK',
        payload: taskId,
      });

      dispatchBoardActions({
        type: 'REMOVE_TASK_ID_FROM_A_BOARD',
        payload: {
          id: list.id,
          taskId,
        },
      });
    });

    dispatchBoardActions({
      type: 'REMOVE_LIST_ID_OF_A_BOARD',
      payload: {
        id: list.boardId,
        listId: list.id,
      },
    });
  };

  const submitHandler = () => {
    const taskId = Date.now().toString();

    dispatchTaskActions({
      type: 'CREATE_TASK',
      payload: {
        id: taskId,
        title: taskTitle,
        listId: list.id,
        boardId: list.boardId,
      },
    });

    dispatchListActions({
      type: 'ADD_TASK_ID_TO_A_LIST',
      payload: {
        id: list.id,
        taskId,
      },
    });

    dispatchBoardActions({
      type: 'ADD_TASK_ID_TO_A_BOARD',
      payload: {
        id: list.boardId,
        taskId,
      },
    });

    setTaskTitle('');
    setEditMode(false);
  };

  return (
    <div className='list-container'>
      <div className='list-title-container'>
        <h5>{list.title}</h5>
        <p onClick={removeHandler} className='add-item-icon'>x</p>

        {list.tasks
          .map((item) => tasks.find((ele) => ele.id === item))
          .filter((task) => task !== undefined)
          .map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}

        {!editMode ? (
          <AddItem listAddItem={false} setEditMode={setEditMode} />
        ) : (
          <AddItemForm
            title={taskTitle}
            onChangeHandler={(e) => setTaskTitle(e.target.value)}
            setEditMode={setEditMode}
            submitHandler={submitHandler}
          />
        )}
      </div>
    </div>
  );
};

export default TaskList;
