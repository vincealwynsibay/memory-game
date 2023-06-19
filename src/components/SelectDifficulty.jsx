import React from "react";

function SelectDifficulty({ handleDifficulty }) {
  return (
    <div>
      <p onClick={() => handleDifficulty({ n: 4, duration: 15 })}>Easy</p>
      <p onClick={() => handleDifficulty({ n: 16, duration: 30 })}>Normal</p>
      <p onClick={() => handleDifficulty({ n: 36, duration: 60 })}>Hard</p>
    </div>
  );
}

export default SelectDifficulty;
