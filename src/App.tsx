function App() {
  // ダミーデータ Todo:一時的
  const ROWS = 4;
  const COLS = 6;
  const playerRow = 0;
  const playerCol = 0;
  const diceResult = 3;
  const remainingMoves = 3;

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
        <span>サイコロ: <strong>{diceResult}</strong></span>
        <span>残り移動数: <strong>{remainingMoves}</strong></span>
      </div>

      {/* サイコロボタン */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl text-lg">
        サイコロ
      </button>

    </div>
  );
}

export default App;