import React from "react";

const Homepage = () => {
  return (
    <main className="homepage_main">
      <div className="homepage_title">
        <h1>Flapp'invader</h1>
      </div>
      <div>
        <button onClick={() => Rune.actions.startGame}>Start</button>
      </div>
    </main>
  );
};

export default Homepage;
