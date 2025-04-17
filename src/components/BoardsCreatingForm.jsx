import React, { useContext, useState } from 'react';
import { BoardContext } from '../contexts/Board';

const BoardsCreatingForm = () => {
  const [boardTitle, setBoardTitle] = useState('');
  const { dispatchBoardActions } = useContext(BoardContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (boardTitle.trim() === '') {
      alert('Please provide a valid title');
      return;
    }

    dispatchBoardActions({ type: 'CREATE_BOARD_NAME', payload: boardTitle });
    setBoardTitle('');
  };

  return (
    <div className='align-center m-top-md'>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          value={boardTitle}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
        <button type='submit' disabled={boardTitle.trim() === ''}>
          Create Board
        </button>
      </form>
    </div>
  );
};

export default BoardsCreatingForm;
