import type { FC } from "react";
import type { Candy } from "../../types";

import { Sprite } from "@pixi/react";
import { computeX, computeY } from "../../utils";

type CandyProps = {
  isMe: boolean;
  candy?: Candy;
  color?: number;
  canvaHeight?: number;
  canvaWidth?: number
  candySize?:number
};

const Candy: FC<CandyProps> = ({ candy, isMe, color, canvaHeight=800, canvaWidth=350, candySize=5}) => {

  return (
    <Sprite
      width={computeX(candySize, window.innerWidth, canvaWidth)}
      height={computeY(candySize, window.innerHeight, canvaHeight)}
      image={`/images/candies/candy-${color}.svg`}
      alpha={isMe ? 1 : 0.9}
      anchor={0.5}
      x={computeX(candy?.x || -100,window.innerWidth , canvaWidth)}
      y={computeY(candy?.y || window.innerHeight / 2,window.innerHeight , canvaHeight)}
      rotation={candy?.rotation}
    />
  );
};

export default Candy;
