import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BoardContext } from '../contexts/Board';
import BoardItem from './BoardsItem';


const BoardsList = () => {
  const { boards } = useContext(BoardContext);
  return (
    <div>
      {boards.map((board) => (
        <Link key={board.id} to={`/boards/${board.id}`}>
          <BoardItem board={board} />
        </Link>
      ))}
    </div>
  );
};

export default BoardsList;
