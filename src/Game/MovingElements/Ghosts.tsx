import { useContext } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";

const INIT_GHOSTS_Y_POSITION: Record<string, number> = {
  top: 14,
  middle: 2.5,
  bottom: 1.5,
};

const INTER_GHOST_SPACING = 40;

const Ghosts = () => {
  const { ghosts } = useContext(GameContext);
  console.log(ghosts);
  return (
    <>
      {ghosts.map(
        (ghost) =>
          ghost.isAlive && (
            <Sprite
              key={ghost.y}
              image="/images/ghost.svg"
              anchor={1}
              scale={{ x: 0.5, y: 0.5 }}
              x={ghost.x === 0 ? window.innerWidth : ghost.x}
              y={
                window.innerHeight / INIT_GHOSTS_Y_POSITION[ghost.position] +
                ghost.y * INTER_GHOST_SPACING
              }
            />
          )
      )}
    </>
  );
};

export default Ghosts;
