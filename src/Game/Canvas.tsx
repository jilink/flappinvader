import type { FC, PropsWithChildren } from "react";
import { Stage, TilingSprite } from "@pixi/react";
import { useContext, useEffect, useState } from "react";
import { PlayerId } from "rune-games-sdk";
import { Container } from "pixi.js";

type CanvasProps = {
  id: PlayerId;
};

export const Canvas: FC<PropsWithChildren<CanvasProps>> = ({
  id,
  children,
}) => {
  const [backgroundX, setBacgrkoundx] = useState(0);
  const backgroundSpeed = -1;

  const handleJump = () => {
    Rune.actions.jumpPumpkin({ id });
  };

  useEffect(() => {
    const scrollBacgrkound = setInterval(() => {
      setBacgrkoundx((x) => x + backgroundSpeed);
    }, 20);

    return () => {
      clearInterval(scrollBacgrkound);
    };
  }, [backgroundSpeed]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onPointerUp={handleJump}
    >
      <TilingSprite
        image={"/images/game_bg.png"}
        width={window.innerWidth}
        height={window.innerHeight}
        tilePosition={{ x: backgroundX, y: 0 }}
        tileScale={{ x: 1, y: 0.89 }}
      />
      {children}
    </Stage>
  );
};
