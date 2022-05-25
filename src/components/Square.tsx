import React from 'react';
import { SquareValue } from '../types/board';

type Props = {
  value: SquareValue;
  onClick: React.MouseEventHandler;
};

export const Square: React.FC<Props> = ({ value, onClick }) => {
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};
