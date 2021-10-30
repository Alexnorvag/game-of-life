import { useCallback, useMemo, useEffect, useRef, useState } from "react";

import { useWindowSize } from "./hooks";
import { cellsGenerate, prevDividend } from "./utils";
import Grid from "./components/Grid/Grid";
import Svg from "./components/Svg/Svg";

import { ReactComponent as PlayIcon } from "./assets/svg/play.svg";
import { ReactComponent as PauseIcon } from "./assets/svg/pause.svg";
import "./App.css";

function App() {
  const windowSize = useWindowSize({ margin: 15 });

  const squareSize = 10;
  const radius = squareSize / 2;
  const width = useMemo(
    () => prevDividend(windowSize.width, squareSize),
    [windowSize.width]
  );
  const height = useMemo(
    () => prevDividend(windowSize.height, squareSize),
    [windowSize.height]
  );
  const colsNumber = useMemo(() => Math.ceil(width / squareSize), [width]);
  const rowsNumber = useMemo(() => Math.ceil(height / squareSize), [height]);

  const [running, setRunning] = useState(false);
  const timerId = useRef(0);
  const runTime = 50;

  const [cells, setCells] = useState(
    cellsGenerate(rowsNumber, colsNumber, squareSize, radius)
  );

  const run = useCallback(() => {
    const check_neighbors = (el) => {
      let newCell = { ...el };

      let neighbours = [];
      neighbours.push(cells[(el.r - 1) * colsNumber + (el.c - 1)]);
      neighbours.push(cells[el.r * colsNumber + (el.c - 1)]);
      neighbours.push(cells[(el.r + 1) * colsNumber + (el.c - 1)]);
      neighbours.push(cells[(el.r - 1) * colsNumber + el.c]);
      neighbours.push(cells[(el.r + 1) * colsNumber + el.c]);
      neighbours.push(cells[(el.r - 1) * colsNumber + (el.c + 1)]);
      neighbours.push(cells[el.r * colsNumber + (el.c + 1)]);
      neighbours.push(cells[(el.r + 1) * colsNumber + (el.c + 1)]);

      neighbours = neighbours.filter((neighbour) => {
        return neighbour && neighbour.alive === true;
      });

      newCell = {
        ...newCell,
        alive:
          (newCell.alive && neighbours.length >= 2 && neighbours.length <= 3) ||
          (!newCell.alive && neighbours.length === 3),
      };
      return newCell;
    };

    setCells((c) => c.map((cell) => check_neighbors(cell)));
  }, [cells, colsNumber]);

  const toggleGeneration = () => setRunning((s) => !s);

  useEffect(() => {
    if (running) {
      timerId.current = setInterval(run, runTime);
    } else {
      clearInterval(timerId.current);
    }

    return () => clearInterval(timerId.current);
  }, [running, run]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="controls">
          {running ? (
            <PauseIcon onClick={toggleGeneration} />
          ) : (
            <PlayIcon onClick={toggleGeneration} />
          )}
        </div>

        <Svg width={width} height={height}>
          {(ref) => (
            <Grid
              svgRef={ref}
              data={cells}
              squareSize={squareSize}
              radius={radius}
            />
          )}
        </Svg>
      </header>
    </div>
  );
}

export default App;
