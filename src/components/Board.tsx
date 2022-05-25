import React, { useCallback, useMemo, useState } from 'react';
import { BoardValue, SquareValue } from '../types/board';
import { calculateWinner } from '../utils/boardHelper';
import { Square } from './Square';

export const Board = () => {
  const [squares, setSquares] = useState<SquareValue[]>(
    new Array(9).fill(null)
  );
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const nextPlayer = useMemo<BoardValue>(
    () => (xIsNext ? 'X' : 'O'),
    [xIsNext]
  );
  const winner = useMemo<SquareValue>(
    () => calculateWinner(squares),
    [squares]
  );
  const createHandleClick = useCallback(
    (i: number) => () => {
      if (calculateWinner(squares) != null || squares[i]) {
        return;
      }
      setSquares((state) => {
        const newState = state.slice();
        newState[i] = nextPlayer;
        return newState;
      });
      setXIsNext((state) => !state);
    },
    [nextPlayer, squares]
  );
  const renderSquare = useCallback(
    (i: number) => {
      return <Square value={squares[i]} onClick={createHandleClick(i)} />;
    },
    [squares, createHandleClick]
  );

  return (
    <div>
      <div className="status">
        {winner != null ? `Winner: ${winner}` : `Next player: ${nextPlayer}`}
      </div>
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
