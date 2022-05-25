export type SquareValue = BoardValue | null;
export type BoardValue = 'X' | 'O';
export type History = {
  id: number;
  squares: SquareValue[];
};
