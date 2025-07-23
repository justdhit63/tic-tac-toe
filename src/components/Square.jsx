import React from 'react'

const Square = ({value, onSquareClick}) => {

  return <button className=' bg-gray-700 border w-full h-36 rounded-lg text-7xl font-bold text-gray-100' onClick={onSquareClick}>{value}</button>
}

export default Square
