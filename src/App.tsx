import { useEffect, useState } from "react"
import { GameState } from "./logic.ts"
import { Canvas } from "./Game/Canvas.tsx"

function App() {
  const [game, setGame] = useState<GameState>()
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
     <Canvas/>
    </>
  )
}

export default App
