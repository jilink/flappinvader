import type { Pumpkin } from "../../types";
import type { FC } from "react";

import React, { useContext, useEffect } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";
import Candy from "./Candy";
import { computeX, computeY } from "../../utils";
import useSound, { SoundKey } from "../../hooks/useSounds";

type PumpkinProps = {
  id: string;
  isMe: boolean;
  pumpkin?: Pumpkin;
  canvaHeight?: number;
  canvaWidth?: number;
  pumpkinSize?: number;
};

const Pumpkin: FC<PumpkinProps> = ({
  isMe,
  pumpkin,
  canvaHeight = 800,
  canvaWidth = 350,
  pumpkinSize = 40,
}) => {
  const { play, stop } = useSound({ key: SoundKey.DEAD });

  useEffect(() => {
    if (pumpkin && !pumpkin.isAlive) {
      play();
    }
    return () => {
      stop();
    };
  }, [pumpkin?.isAlive, play, pumpkin, stop]);
  return (
    <>
      <Sprite
        width={computeX(pumpkinSize, window.innerWidth, canvaWidth)}
        height={computeY(pumpkinSize, window.innerHeight, canvaHeight)}
        image={`/images/pumpkins/pumpkin-${pumpkin?.color}.svg`}
        alpha={isMe ? 1 : 0.3}
        anchor={0.5}
        x={computeX(
          pumpkin?.x || window.innerWidth / 5,
          window.innerWidth,
          canvaWidth
        )}
        y={computeY(
          pumpkin?.y || window.innerHeight / 2,
          window.innerHeight,
          canvaHeight
        )}
        rotation={pumpkin?.rotation}
      />

      {/* Diying animation */}
      {!pumpkin?.isAlive && (
        <Sprite
          width={computeX(pumpkinSize, window.innerWidth, canvaWidth)}
          height={computeY(pumpkinSize, window.innerHeight, canvaHeight)}
          image={`/images/animations/dead-pumpkin.png`}
          alpha={isMe ? 1 : 0.3}
          anchor={0.5}
          x={computeX(
            pumpkin?.x || window.innerWidth / 5,
            window.innerWidth,
            canvaWidth
          )}
          y={computeY(
            pumpkin?.y || window.innerHeight / 2,
            window.innerHeight,
            canvaHeight
          )}
          rotation={pumpkin?.rotation}
        />
      )}
      {/* shooting animation */}
      {/* {pumpkin?.isShooting && <Sprite
      width={computeX(pumpkinSize, window.innerWidth, canvaWidth)}
      height={computeY(pumpkinSize, window.innerHeight, canvaHeight)}
      image={`/images/animations/shoot.png`}
      alpha={isMe ? 1 : 0.3}
      anchor={0.5}
      x={computeX(
        pumpkin?.x || window.innerWidth / 5,
        window.innerWidth,
        canvaWidth
      )}
      y={computeY(
        pumpkin?.y || window.innerHeight / 2,
        window.innerHeight,
        canvaHeight
      )}
      rotation={pumpkin?.rotation}
    />} */}
    </>
  );
};

const Pumpkins = () => {
  const { myId, game } = useContext(GameContext);
  return (
    <>
      {Object.keys(game?.pumpkins || []).map((id) => (
        <React.Fragment key={id}>
          <Pumpkin
            canvaHeight={game?.CANVA_HEIGHT}
            canvaWidth={game?.CANVA_WIDTH}
            id={id}
            pumpkin={game?.pumpkins[id]}
            isMe={id === myId}
            pumpkinSize={game?.PUMPKIN_SIZE}
          />
          <Candy
            candy={game?.pumpkins[id].candy}
            isMe={id === myId}
            color={game?.pumpkins[id]?.color}
            canvaHeight={game?.CANVA_HEIGHT}
            canvaWidth={game?.CANVA_WIDTH}
            candySize={game?.CANDY_SIZE}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export { Pumpkins };

export default Pumpkin;
