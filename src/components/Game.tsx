import React, { useCallback, useMemo, useState } from 'react';
import { BoardValue, History, SquareValue } from '../types/board';
import { calculateWinner } from '../utils/boardHelper';
import { Board } from './Board';

export const Game: React.FC = () => {
  const [history, setHistory] = useState<History[]>([
    { id: Date.now(), squares: new Array(9).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const nextPlayer = useMemo<BoardValue>(
    () => (xIsNext ? 'X' : 'O'),
    [xIsNext]
  );
  const current = useMemo<History>(
    () => history[stepNumber],
    [history, stepNumber]
  );
  const winner = useMemo<SquareValue>(
    () => calculateWinner(current.squares),
    [current]
  );
  const jumpTo = useCallback(
    (step: number) => () => {
      setStepNumber(step);
      setXIsNext(step % 2 === 0);
    },
    []
  );
  const handleClick = useCallback(
    (index: number) => {
      const currentHistory = history.slice(0, stepNumber + 1);
      const currentSquares =
        currentHistory[currentHistory.length - 1].squares.slice();
      if (calculateWinner(currentSquares) != null || currentSquares[index]) {
        return;
      }
      currentSquares[index] = nextPlayer;
      setHistory(() => [
        ...currentHistory,
        { id: Date.now(), squares: currentSquares },
      ]);
      setStepNumber(currentHistory.length);
      setXIsNext((state) => !state);
    },
    [history, nextPlayer, stepNumber]
  );
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>
          {winner != null ? `Winner: ${winner}` : `Next player: ${nextPlayer}`}
        </div>
        <ol>
          {history.map(({ id }, step) => {
            const message =
              step > 0 ? `Go to move ${step}` : 'Go to game start';
            return (
              <li key={id}>
                <button type="button" onClick={jumpTo(step)}>
                  {message}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
