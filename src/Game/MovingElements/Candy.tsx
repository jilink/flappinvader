import type { FC } from "react";
import type { Candy } from "../../types";

import { Sprite } from "@pixi/react";

type CandyProps = {
  isMe: boolean;
  candy?: Candy;
  color?: number;
};

const Candy: FC<CandyProps> = ({ candy, isMe, color }) => {

  return (
    <Sprite
      image={`/images/candies/candy-${color}.svg`}
      // alpha={isMe ? 1 : 0.3}
      scale={{ x: 0.05, y: 0.05 }}
      anchor={0.5}
      x={candy?.x}
      y={candy?.y || window.innerHeight / 2}
      rotation={candy?.rotation}
    />
  );
};

export default Candy;
