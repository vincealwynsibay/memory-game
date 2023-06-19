import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Game from "./components/Game";
import SelectDifficulty from "./components/SelectDifficulty";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [gameState, setGameState] = useState(null);

  const handleDifficulty = (num) => {
    setDifficulty(() => num);
  };

  const [duration, setDuration] = useState(10);

  useEffect(() => {
    if (!difficulty || gameState === "winner") return;
    setDuration(difficulty.duration);
    const timer = setInterval(() => {
      setDuration((prevDuration) => prevDuration - 1);
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [difficulty, gameState]);

  useEffect(() => {
    if (duration === 0) {
      setDifficulty(null);
    }
  }, [duration]);

  return (
    <div>
      <h1>Welcome to Memory Game!</h1>
      {difficulty && <p>{duration}</p>}
      {!difficulty && <SelectDifficulty handleDifficulty={handleDifficulty} />}
      {difficulty && (
        <Game
          n={difficulty.n}
          handleDifficulty={handleDifficulty}
          duration={difficulty.duration - duration}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
    </div>
  );
}

export default App;
