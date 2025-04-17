import React, { useContext, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import AddItem from '../components/AddItem';
import AddItemForm from '../components/AddItemForm';
import { BoardContext } from '../contexts/Board';
import { ListContext } from '../contexts/List';

const BoardDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState(""); // ✅ FIXED HERE
  const { boardId } = useParams();
  const { dispatchBoardActions } = useContext(BoardContext);
  const { lists, dispatchListActions } = useContext(ListContext);

  const renderedList = lists.filter((item) => item.boardId === boardId);

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Date.now() + "";

    dispatchListActions({
      type: "CREATE_LIST",
      payload: {
        id: id,
        title: listTitle,
        boardId: boardId,
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

  return (
    <div className='d-flex m-top-sm flex-direction-row'>
      <Link to={'/'}>Back to Board</Link>
      
      <ul>
        {renderedList.map((list) => (
          <li key={list.id}>{list.title}</li>
        ))}
      </ul>

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
  );
};

export default BoardDetails;
