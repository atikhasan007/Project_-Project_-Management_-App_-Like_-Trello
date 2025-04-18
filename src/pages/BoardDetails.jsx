import React, { useContext, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import AddItem from '../components/AddItem';
import AddItemForm from '../components/AddItemForm';
import { BoardContext } from '../contexts/Board';
import { ListContext } from '../contexts/List';
import { TaskContext } from '../contexts/Task';
import TaskList from '../components/TaskList';

const BoardDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const { boardId } = useParams();
  const { dispatchBoardActions } = useContext(BoardContext);
  const { lists, dispatchListActions } = useContext(ListContext);
  const { dispatchTaskActions } = useContext(TaskContext);

  if (!dispatchBoardActions || !dispatchListActions) {
    console.error("Context dispatchers are undefined. Make sure your providers are wrapped around this component.");
    return <div>Error: Missing context</div>;
  }

  const renderedLists = lists.filter((item) => item.boardId === boardId);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!listTitle.trim()) return;

    const id = Date.now().toString();

    dispatchListActions({
      type: "CREATE_LIST",
      payload: {
        id,
        title: listTitle.trim(),
        boardId,
      },
    });

    dispatchBoardActions({
      type: "ADD_LIST_ID_TO_A_BOARD",
      payload: {
        id: boardId,
        listId: id,
      },
    });

    setEditMode(false);
    setListTitle("");
  };

  const dragHandler = (result) => {
    const { draggableId, destination, source } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      dispatchTaskActions({
        type: "CHANGE_LIST_ID_OF_A_TASK",
        payload: {
          id: draggableId,
          listId: destination.droppableId,
        },
      });
    }

    dispatchListActions({
      type: "SORT_TASK_IDS_IN_A_LIST",
      payload: {
        draggableId,
        source,
        destination,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <div className="d-flex flex-column p-3 gap-3">
        <Link to="/" className="btn btn-link">← Back to Boards</Link>

        <div className="d-flex flex-wrap gap-4">
          {renderedLists.map((list) => (
            <TaskList key={list.id} list={list} />
          ))}

          {!editMode ? (
            <AddItem
              listAddItem={true}
              setEditMode={setEditMode}
            />
          ) : (
            <AddItemForm
              listForm={true}
              title={listTitle}
              onChangeHandler={(e) => setListTitle(e.target.value)}
              setEditMode={setEditMode}
              submitHandler={submitHandler}
            />
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardDetails;
