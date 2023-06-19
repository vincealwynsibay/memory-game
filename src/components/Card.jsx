import React, { useState } from "react";

function Card({ card, handleClick }) {
  const handleVisible = () => {
    handleClick(card);
  };

  return (
    <div>
      <div className="card" onClick={handleVisible}>
        {card.isVisible ? card.value : "X"}
      </div>
    </div>
  );
}

export default Card;
