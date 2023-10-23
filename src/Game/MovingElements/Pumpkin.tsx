import type { Pumpkin } from "../../types";
import type { FC } from "react";

import React, { useContext, useEffect } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";
import Candy from "./Candy";

type PumpkinProps = {
  id: string;
  isMe: boolean;
  pumpkin?: Pumpkin;
};

const Pumpkin: FC<PumpkinProps> = ({ id, isMe, pumpkin }) => {
  useEffect(() => {
    // we sent first position of pumpkin to server since it depends on screen size
    Rune.actions.updatePumpkin({
      id,
      updatePumpkin: {
        maxHeight: window.innerHeight,
        maxWidth: window.innerWidth,
        y: window.innerHeight / 2,
        x: window.innerWidth / 5,
      },
    });
  }, [window, id]);

  return (
    <Sprite
      image={`/images/pumpkins/pumpkin-${pumpkin?.color}.svg`}
      alpha={isMe ? 1 : 0.3}
      scale={{ x: 0.05, y: 0.05 }}
      anchor={0.5}
      x={pumpkin?.x || window.innerWidth / 5}
      y={pumpkin?.y || window.innerHeight / 2}
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
          <Pumpkin id={id} pumpkin={game?.pumpkins[id]} isMe={id === myId} />
          <Candy
            candy={game?.pumpkins[id].candy}
            isMe={id === myId}
            color={game?.pumpkins[id]?.color}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export { Pumpkins };

export default Pumpkin;
