import React, { useContext } from "react";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import GameContext from "../context/game-context";

const Score = () => {
  const { mePumpkin } = useContext(GameContext);
  return (
    <Text
      anchor={0.5}
      x={window.innerWidth / 2}
      y={window.innerHeight / 8}
      text={`${Math.floor(mePumpkin?.score || 0)}`}
      style={
        new TextStyle({
          align: "center",
          fill: "#AE445A",
          stroke: "#000",
          strokeThickness: 3,
          fontFamily: "'JejuHallasan', sans-serif",
          fontSize: 65,
        })
      }
    />
  );
};

export default Score;
