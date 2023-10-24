import React from "react";
import { Pumpkins } from "./MovingElements/Pumpkin";
import Ghosts from "./MovingElements/Ghosts";
import Score from "./Score";

const Game = () => {
  return (
    <>
    <Score/>
      <Ghosts />
      <Pumpkins />
    </>
  );
};

export default Game;
