import { useContext, useEffect, useState } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";

const Ghosts = () => {
  const ghostNum = 6;
  const topScreenStartPoint = 14;
  const interGhostSpacing = 40;
  const initialX = window.innerWidth;
  const [xPositions, setXPositions] = useState(
    Array.from({ length: ghostNum }, () => initialX)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      // Update x positions for each ghost
      setXPositions((prevXPositions) => prevXPositions.map((x) => x - 1));
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const ghosts = xPositions.map((x, index) => (
    <Sprite
      key={index}
      image="/images/ghost.svg"
      anchor={1}
      scale={{ x: 0.5, y: 0.5 }}
      x={x}
      y={window.innerHeight / topScreenStartPoint + index * interGhostSpacing}
    />
  ));

  return <>{ghosts}</>;
};

export default Ghosts;
