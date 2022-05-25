import React, { useCallback } from 'react';
import { SquareValue } from '../types/board';
import { Square } from './Square';

type Props = {
  squares: SquareValue[];
  onClick: (index: number) => void;
};

export const Board: React.FC<Props> = ({ squares, onClick }) => {
  const createHandleClick = useCallback(
    (i: number) => () => {
      onClick(i);
    },
    [onClick]
  );
  const renderSquare = useCallback(
    (i: number) => {
      return <Square value={squares[i]} onClick={createHandleClick(i)} />;
    },
    [squares, createHandleClick]
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};
