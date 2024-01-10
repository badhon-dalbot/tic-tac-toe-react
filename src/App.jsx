/* eslint-disable no-const-assign */
import { useState } from "react";
import Board from "./components/Board";

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [xIsNext, setXIsNext] = useState(true);

  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move ${move}`;
    } else {
      description = "Start the game";
    }
    return (
      <li key={move} className="bg-green-200 m-1 p-2 rounded text-lg">
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center mt-6">
        Tic Tac Toe
      </h1>
      <div className="flex justify-evenly mt-5">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div>
          <ol className="border border-gray500">
            <li>{moves} </li>
          </ol>
        </div>
      </div>
    </>
  );
}
