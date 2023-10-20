import { BlurFilter, TextStyle } from "pixi.js";
import { Stage, Container, Sprite, Text } from "@pixi/react";
import { useMemo } from "react";

export const Canvas = () => {
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} options={{ backgroundColor: "blue" }}>
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        x={100}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
      />

      <Container x={100} y={100}>
        <Text
          style={
            new TextStyle({
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: 30,
              fill: ["#ffffff", "#00ff99"]
            })
          }
          text="Hello World"
          anchor={{ x: 0.5, y: 0.5 }}
        />
      </Container>
    </Stage>
  );
};
