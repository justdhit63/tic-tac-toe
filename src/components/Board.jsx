import React from 'react'
import Square from './Square.jsx';

const Board = ({squares, xIsNext, onPlay}) => {

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

export default Board
