import type { Pumpkin } from "../../types";
import type { FC } from "react";

import React, { useContext, useEffect } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";
import Candy from "./Candy";
import { computeX, computeY } from "../../utils";

type PumpkinProps = {
  id: string;
  isMe: boolean;
  pumpkin?: Pumpkin;
  canvaHeight?: number;
  canvaWidth?: number;
  pumpkinSize?: number;
};

const Pumpkin: FC<PumpkinProps> = ({
  id,
  isMe,
  pumpkin,
  canvaHeight = 800,
  canvaWidth = 350,
  pumpkinSize = 40,
}) => {
  return (
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
