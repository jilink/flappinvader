import React, { useContext, useEffect } from 'react'
import GameContext from '../../context/game-context';
import { Sprite } from '@pixi/react';

const Candy = () => {
  const { mePumpkin, myId } = useContext(GameContext);
  useEffect(() => {
    // we sent first position of pumpkin to server since it depends on screen size
    if(myId) {
        Rune.actions.updatePumpkin({id: myId, updatePumpkin: {maxHeight: window.innerHeight, y: window.innerHeight / 2}});
    }
  }, [window, myId])
  

  return (
    <Sprite
      image="/images/candies/candy-1.svg"
      scale={{ x: 0.05, y: 0.05 }}
      anchor={0.5}
      x={mePumpkin?.candy?.x}
      y={mePumpkin?.candy?.y || (window.innerHeight /2)}
      rotation={mePumpkin?.candy?.rotation}
    />
  );
};

export default Candy