import type { FC } from "react";
import type { Game, Ghost as GhostType } from "../../types";
import { useContext, useEffect } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";
import { computeX, computeY } from "../../utils";
import useSound, { SoundKey } from "../../hooks/useSounds";

const Ghosts = () => {
  const { ghosts, game } = useContext(GameContext);

  return (
    <>
      {ghosts?.map((ghost) => (
        <Ghost key={ghost.y} ghost={ghost} game={game} />
      ))}
    </>
  );
};

type GhostProps = {
  ghost: GhostType;
  game?: Game;
};

export const Ghost: FC<GhostProps> = ({ ghost, game }) => {
  const { play, stop } = useSound({ key: SoundKey.GHOST_DEAD });

  useEffect(() => {
    if (ghost && !ghost.isAlive) {
      play();
    }
    return () => {
      stop();
    };
  }, [ghost?.isAlive, ghost, play, stop]);
  return (
    <>
      {ghost.isAlive && (
        <Sprite
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
          y={computeY(
            ghost.y,
            window.innerHeight,
            game?.CANVA_HEIGHT || window.innerHeight
          )}
        />
      )}
    </>
  );
};

export default Ghosts;

// function convertHeight(height1, height2) {
//   return (height2 * 100) / height1;
// }
