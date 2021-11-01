import GameContainer from "./layout/GameContainer";

import "./App.css";

function App() {
  console.log("[APP] -> render");

  return (
    <div className="App">
      <header className="App-header">
        <GameContainer />
      </header>
    </div>
  );
}

export default App;
