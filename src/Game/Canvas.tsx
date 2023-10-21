import type {FC, PropsWithChildren} from "react"
import { Stage, TilingSprite } from "@pixi/react";
import { useEffect, useState } from "react";

export const Canvas: FC<PropsWithChildren> = ({children}) => {
  const [backgroundX, setBacgrkoundx] = useState(0);
  const backgroundSpeed = -1;

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
      options={{ backgroundColor: "blue" }}
    >
      <TilingSprite
        image={"/images/game_bg.png"}
        width={window.innerWidth}
        height={window.innerHeight}
        tilePosition={{ x: backgroundX, y: 0 }}
        tileScale={{ x: 1, y: 0.8 }}
      />
      {children}
    </Stage>
  );
};
