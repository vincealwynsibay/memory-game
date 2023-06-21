import { useEffect, useRef } from "react";
import Card from "./Card";

function Grid({ cards, handleClick }) {
  let grid = [];
  let group = [];
  for (let i = 0; i < cards.length; i++) {
    group.push(cards[i]);

    // cards length needs to be a perfect square
    if (i > 0 && (i + 1) % Math.sqrt(cards.length) == 0) {
      grid.current.push(group);
      group = [];
    }
  }

  return (
    <div className="grid">
      {grid &&
        grid.map((group, idx) => {
          return (
            <div className="grid-group" key={cards.length * idx}>
              {group.map((card, idx2) => {
                return (
                  <Card
                    card={card}
                    handleClick={handleClick}
                    key={cards.length * idx + idx2}
                  />
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default Grid;
