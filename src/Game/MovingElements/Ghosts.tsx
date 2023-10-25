import { useContext } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";
import { computeX, computeY } from "../../utils";

const Ghosts = () => {
  const { ghosts, game } = useContext(GameContext);

  return (
    <>
      {ghosts.map(
        (ghost) =>
          ghost.isAlive && (
            <Sprite
              key={ghost.y}
              image="/images/ghost.svg"
              anchor={0.5}
              width={computeX(
                game?.GHOST_SIZE || 40,
                window.innerWidth,
                game?.CANVA_WIDTH || window.innerWidth
              )}
              height={computeY(
                game?.GHOST_SIZE || 40,
                window.innerHeight,
                game?.CANVA_HEIGHT || window.innerHeight
              )}
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
                )
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
