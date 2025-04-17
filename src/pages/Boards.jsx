import React from 'react';
import BoardsCreatingForm from '../components/BoardsCreatingForm'
import BoardsList from '../components/BoardList';

const Boards = () => {
  return (
    <div className='all-div'>
      <BoardsCreatingForm />
      <BoardsList />
    </div>
  );
};

export default Boards;
