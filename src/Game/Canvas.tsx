import type { FC, PropsWithChildren } from "react";
import { Stage, TilingSprite } from "@pixi/react";
import { useEffect, useState } from "react";
import { PlayerId } from "rune-games-sdk";
import { Container } from "pixi.js";
import useSound from "../hooks/useSounds";

type CanvasProps = {
  id: PlayerId;
};

export const Canvas: FC<PropsWithChildren<CanvasProps>> = ({
  id,
  children,
}) => {
  const [backgroundX, setBacgrkoundx] = useState(0);
  const backgroundSpeed = -1;
  const { play, stop } = useSound({ key: "JUMP" });
  const { play: playMusic, stop: stopMusic } = useSound({ key: "MUSIC" });

  useEffect(() => {
    playMusic();
    return () => {
      stopMusic();
    };
  }, []);

  useEffect(() => {
    const scrollBacgrkound = setInterval(() => {
      setBacgrkoundx((x) => x + backgroundSpeed);
    }, 20);

    return () => {
      clearInterval(scrollBacgrkound);
    };
  }, [backgroundSpeed]);

  const handleJump = () => {
    //TODO Disable if game has not started yet or if player is dead
    stop();
    play();
    Rune.actions.jumpPumpkin({ id });
  };

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
