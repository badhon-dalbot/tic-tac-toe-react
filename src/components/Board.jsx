import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white w-12 h-12 border border-gray-400 m-1 text-lg"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [xIsNext, setXIsNext] = useState(true);

  let winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Player ${xIsNext ? "X" : "O"}`;
  }

  function handdleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares([...nextSquares]);
    setXIsNext(!xIsNext);
  }
  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handdleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handdleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handdleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handdleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handdleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handdleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handdleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handdleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handdleClick(8)} />
      </div>
    </>
  );
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
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
