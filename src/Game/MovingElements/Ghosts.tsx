import { useContext, useEffect } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";

const Ghosts = () => {
  const ghostNum = 6;
  const topScreenStartPoint = 14;
  const interGhostSpacing = 40;
  const ghosts = Array.from({ length: ghostNum }, (_, index) => (
    <Sprite
      key={index} // Add a unique key prop for each element
      image="/images/ghost.svg"
      anchor={1}
      scale={{ x: 0.5, y: 0.5 }}
      x={window.innerWidth}
      y={window.innerHeight / topScreenStartPoint + index * interGhostSpacing}
    />
  ));

  return <>{ghosts}</>;
};

export default Ghosts;
