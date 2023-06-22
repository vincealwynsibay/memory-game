import React, { useEffect, useState } from "react";
import Grid from "./Grid";

function Game({ n, handleDifficulty, gameState, setGameState, duration }) {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const totalDuration = duration;

  useEffect(() => {
    let visibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let arr = Array.from(Array(n).keys());

    for (let i = 0, j = 0; i < n; i += 2, j++) {
      arr[i] = { id: i, value: visibleValues[j], isVisible: false };
      arr[i + 1] = { id: i + 1, value: visibleValues[j], isVisible: false };
    }

    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    arr = shuffle(arr);

    setCards(arr);
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setGameState("checking");
      const valid = handleCheck();

      if (!valid) {
        // update the is visible property of the clicked card
        setTimeout(() => {
          setCards((cs) => {
            return cs.map((c) => {
              if (c.id === selectedCards[0]) {
                return { ...c, isVisible: false };
              }
              if (c.id === selectedCards[1]) {
                return { ...c, isVisible: false };
              }
              return c;
            });
          });
          setGameState("playing");
        }, 1000);
      } else {
        const isWin = isWinner();
        setGameState(isWin ? "winner" : "playing");
      }

      setSelectedCards([]);
    }
  }, [selectedCards]);

  const handleClick = (card) => {
    if (gameState === "checking") return;

    let valid = true;

    // check if the clicked card is not already selected
    for (let i = 0; i < selectedCards.length; i++) {
      if (card.id === selectedCards[i]) {
        valid = false;
      }
    }

    // update the is visible property of the clicked card
    if (valid) {
      setCards((cs) => {
        return cs.map((c) => {
          if (c.id === card.id) {
            return { ...c, isVisible: true };
          } else {
            return c;
          }
        });
      });
    }

    if (valid) {
      setSelectedCards((c) => [...c, card.id]);
    }
  };

  const isWinner = () => {
    let isWin = true;
    for (let i = 0; i < cards.length; i++) {
      if (!cards[i].isVisible) {
        isWin = false;
      }
    }

    return isWin;
  };

  const handleCheck = () => {
    let valid = false;

    const card1 = cards.find((c) => c.id === selectedCards[0]);
    const card2 = cards.find((c) => c.id === selectedCards[1]);

    if (card1.value === card2.value) {
      valid = true;
      setCards((cs) => {
        return cs.map((c) => {
          if (c.id == selectedCards[0]) {
            return { ...c, isVisible: true };
          }

          if (c.id == selectedCards[1]) {
            return { ...c, isVisible: true };
          }

          return c;
        });
      });
    }
    return valid;
  };

  return (
    <div>
      {gameState !== "winner" && (
        <Grid cards={cards} handleClick={handleClick} />
      )}
      {gameState === "winner" && (
        <>
          <h2>You Win!</h2>
          <p>it took you {totalDuration} seconds to win the game!</p>
          <button
            onClick={() => {
              setGameState(null);
              handleDifficulty(null);
            }}
          >
            restart
          </button>
        </>
      )}
    </div>
  );
}

export default Game;
