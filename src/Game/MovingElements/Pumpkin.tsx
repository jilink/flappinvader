import React, { useContext, useEffect, useState } from "react";
import { Sprite } from "@pixi/react";
import GameContext from "../../context/game-context";

const Pumpkin = () => {
  const { mePumpkin, myId } = useContext(GameContext);
  useEffect(() => {
    // we sent first position of pumpkin to server since it depends on screen size
    if(myId) {
        Rune.actions.updatePumpkin({id: myId, updatePumpkin: {maxHeight: window.innerHeight, y: window.innerHeight / 2}});
    }
  }, [window, myId])
  

  return (
    <Sprite
      image="/images/pumpkin.svg"
      scale={{ x: 0.05, y: 0.05 }}
      anchor={0.5}
      x={window.innerWidth / 5}
      y={mePumpkin?.y || (window.innerHeight /2)}
      rotation={mePumpkin?.rotation}
    />
  );
};

export default Pumpkin;
