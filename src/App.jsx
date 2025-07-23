import { useState } from 'react'
import Header from './components/Header.jsx'

function Square({value, onSquareClick}) {

  return <button className=' bg-gray-700 border w-full h-36 rounded-lg text-7xl font-bold text-gray-100' onClick={onSquareClick}>{value}</button>
}

function Board({squares, xIsNext, onPlay}) {

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? 'X' : 'O';

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = '';
  if (winner){
    status = `Winner: ${winner}`;
  } else {
    status = `Player Turn: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
    <div className="">
      <h1 className='text-center text-4xl font-bold mb-8 text-gray-100'>TIC TAC TOE</h1>
      <h1 className='mx-auto text-center text-xl mb-4 text-gray-100'><span className='font-medium'>{status}</span></h1>
      <div className="grid grid-cols-3 grid-rows-3 w-lg mx-auto">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
    </>
  )
}

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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i=0; i<lines.length; i++){
    // const a = lines[i][0];
    // const b = lines[i][1];
    // const c = lines[i][2];
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  return false;
}