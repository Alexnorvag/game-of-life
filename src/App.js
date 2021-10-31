import GameLayout from "./layout/Game";
import Svg from "./components/Svg/Svg";
import Grid from "./components/Grid/Grid";

import "./App.css";

function App() {
  console.log("[APP] -> render");

  return (
    <div className="App">
      <header className="App-header">
        <GameLayout>
          {(width, height, cells, squareSize) => (
            <Svg width={width} height={height}>
              {(ref) => (
                <Grid svgRef={ref} data={cells} squareSize={squareSize} />
              )}
            </Svg>
          )}
        </GameLayout>
      </header>
    </div>
  );
}

export default App;
