import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Game from "./components/Game";
import SelectDifficulty from "./components/SelectDifficulty";

function App() {
  const [gameState, setGameState] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [duration, setDuration] = useState(10);

  useEffect(() => {
    if (!difficulty || gameState === "winner") return;
    setDuration(difficulty.duration);
    const timer = setInterval(() => {
      setDuration((prevDuration) => prevDuration - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [difficulty, gameState]);

  useEffect(() => {
    if (duration === 0) {
      setDifficulty(null);
    }
  }, [duration]);

  const handleDifficulty = (num) => {
    setDifficulty(() => num);
  };

  return (
    <div>
      <h1>Welcome to Memory Game!</h1>

      <div>
        {difficulty && <p>{duration}</p>}
        {!difficulty && (
          <SelectDifficulty handleDifficulty={handleDifficulty} />
        )}
      </div>

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
