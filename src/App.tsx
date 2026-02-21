import { useState, useEffect } from "react";
import { rollDice, movePlayer } from "./logic/game";

const ROWS = 4
const COLS = 6

function App() {
  const [playerRow, setPlayerRow] = useState(0)
  const [playerCol, setPlayerCol] = useState(0)
  const [diceResult, setDiceResult] = useState<number | null>(null)
  const [remainingMoves, setRemainingMoves] = useState(0)

  const handleRollDice = () => {
    const result = rollDice()
    setDiceResult(result)
    setRemainingMoves(result)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (remainingMoves === 0) return;

      const directionMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };

      const direction = directionMap[e.key];
      if (!direction) return;

      const result = movePlayer(playerRow, playerCol, direction, ROWS, COLS);

      if (result.moved) {
        setPlayerRow(result.row);
        setPlayerCol(result.col);
        setRemainingMoves((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerRow, playerCol, remainingMoves]);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-8">

      <h1 className="text-3xl font-bold">ももてつ</h1>

      <div className="flex flex-col gap-1">
        {Array.from({ length: ROWS }).map((_, row) => (
          <div key={row} className="flex gap-1">
            {Array.from({ length: COLS }).map((_, col) => {
              const isPlayer = row === playerRow && col === playerCol;
              const isGoal = row === 3 && col === 5;

              return (
                <div
                  key={col}
                  className={`
                    w-16 h-16 flex items-center justify-center rounded text-sm font-bold border-2
                    ${isPlayer ? 'bg-yellow-400 border-yellow-600' : ''}
                    ${isGoal && !isPlayer ? 'bg-green-400 border-green-600' : ''}
                    ${!isPlayer && !isGoal ? 'bg-white border-gray-300' : ''}
                  `}
                >
                  {isPlayer ? '🚃' : isGoal ? '🏁' : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex gap-8 text-lg">
        <span>サイコロ: <strong>{diceResult ?? 'サイコロを振ってください'}</strong></span>
        <span>残り移動数: <strong>{remainingMoves}</strong></span>
      </div>

      <button onClick={handleRollDice} disabled={remainingMoves > 0} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl text-lg">
        サイコロ
      </button>

    </div>
  );
}

export default App;