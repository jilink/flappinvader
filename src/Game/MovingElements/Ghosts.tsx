import { useContext } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";
import { computeX, computeY } from "../../utils";

const Ghosts = () => {
  const { ghosts, game } = useContext(GameContext);
  const INIT_GHOSTS_Y_POSITION: Record<string, number> = {
    top: 0,
    middle: window.innerHeight / 3,
    bottom: window.innerHeight - window.innerHeight / 3,
  };

  return (
    <>
      {ghosts.map(
        (ghost) =>
          ghost.isAlive && (
            <Sprite
              key={ghost.y}
              image="/images/ghost.svg"
              anchor={0.5}
              width={computeX(game?.GHOST_SIZE|| 40, window.innerWidth, game?.CANVA_WIDTH || window.innerWidth)}
              height={computeY(game?.GHOST_SIZE || 40, window.innerHeight, game?.CANVA_HEIGHT ||window.innerHeight)}
              // scale={{ x: 0.5, y: 0.5 }}
              x={computeX(
                ghost.x,
                window.innerWidth,
                game?.CANVA_WIDTH || window.innerWidth
              )}
              y={
                computeY(
                  ghost.y,
                  window.innerHeight,
                  game?.CANVA_HEIGHT || window.innerHeight
                ) + INIT_GHOSTS_Y_POSITION[ghost.position]
              }
            />
          )
      )}
    </>
  );
};

export default Ghosts;

function convertHeight(height1, height2) {
  return (height2 * 100) / height1;
}
