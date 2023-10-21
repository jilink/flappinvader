import { useContext, useEffect, useState } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";

const INIT_GHOSTS_X_POSITION = window.innerWidth;
const INIT_GHOSTS_Y_POSITION = {
  top: 14,
  middle: 2.5,
  bottom: 1.5,
};
const INTER_GHOST_SPACING = 40;

function getRandomKey(obj: Record<string, number>) {
  const keys = Object.keys(obj);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

const Ghosts = () => {
  const ghostNum = 6;
  const randomPosition = getRandomKey(
    INIT_GHOSTS_Y_POSITION
  ) as keyof typeof INIT_GHOSTS_Y_POSITION;

  const [xPositions, setXPositions] = useState(
    Array.from({ length: ghostNum }, () => INIT_GHOSTS_X_POSITION)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // Update x positions for each ghost
      setXPositions((prevXPositions) => prevXPositions.map((x) => x - 1));
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [window]);

  const ghosts = xPositions.map((x, index) => (
    <Sprite
      key={index}
      image="/images/ghost.svg"
      anchor={1}
      scale={{ x: 0.5, y: 0.5 }}
      x={x}
      y={
        window.innerHeight / INIT_GHOSTS_Y_POSITION[randomPosition] +
        index * INTER_GHOST_SPACING
      }
    />
  ));

  return <>{ghosts}</>;
};

export default Ghosts;
