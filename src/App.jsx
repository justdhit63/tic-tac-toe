import { useState } from 'react'
import Square from './components/Square.jsx'
import Board from './components/Board.jsx'

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((squares, move) => {
    let description = '';
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className='border py-2 px-4 rounded-lg cursor-pointer bg-gray-400'>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="p-10 bg-gray-900">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="mx-auto text-center mt-4">
          <h1 className='mb-4 text-gray-100'>Time Travel</h1>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    </>
  )
}