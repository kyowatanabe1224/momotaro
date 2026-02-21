
export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1;
}

export function movePlayer(
  row: number,
  col: number,
  direction: 'up' | 'down' | 'left' | 'right',
  ROWS: number,
  COLS: number
): { row: number; col: number; moved: boolean } {
  let newRow = row;
  let newCol = col;

  if (direction === 'up')    newRow = row - 1;
  if (direction === 'down')  newRow = row + 1;
  if (direction === 'left')  newCol = col - 1;
  if (direction === 'right') newCol = col + 1;

  const outOfBounds =
    newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS;

  if (outOfBounds) {
    return { row, col, moved: false };
  }

  return { row: newRow, col: newCol, moved: true };
}