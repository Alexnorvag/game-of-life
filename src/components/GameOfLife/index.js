import { useMemo, useRef, useEffect, useState } from "react";

import Svg from "../../layout/GameContainer/components/Svg";
import GameControls from "./components/GameOfLifeControls";
import { useGameData } from "./hooks/useGameData";
import { /* useGrid, */ useRect } from "../../hooks";
import { prevDividend } from "../../utils";

import "./index.css";

const GameOfLife = ({ width, height }) => {
  console.log("[GAME OF LIFE] -> render");
  const squareSize = 10;
  const boardSize = useMemo(
    () => ({
      width: prevDividend(width, squareSize),
      height: prevDividend(height, squareSize),
    }),
    [width, height]
  );

  const svgEl = useRef();
  // const { createGrid } = useGrid({ svgEl, size: boardSize, squareSize });
  const { data, /* isGameRunning, toggleGameRunning, */ runGame } = useGameData(
    {
      size: boardSize,
      squareSize,
    }
  );

  //   console.log("[GAME OF LIFE] -> data: ", data);
  const { createRectangles } = useRect({
    svgEl,
    // data,
    size: boardSize,
    squareSize,
  });

  const [running, setRunning] = useState(false);
  const timerId = useRef(0);
  const runTime = 50;

  const toggleGameRunning = () => setRunning((s) => !s);

  useEffect(() => {
    if (running) {
      //   timerId.current = setInterval(() => {
      //     console.log("[INTERVAL] -> render");
      //   }, runTime);
      timerId.current = setInterval(runGame, runTime);
      // console.log("TIMER ID: ", timerId.current);
    } else {
      console.log("TIMER ID: ", timerId.current);
      clearInterval(timerId.current);
    }

    return () => clearInterval(timerId.current);
  }, [running, runGame]);

  useEffect(() => {
    createRectangles(data);
    // createGrid();
  }, [/* createGrid, */ createRectangles, data]);

  return (
    <div className="game-of-life">
      <GameControls onClick={toggleGameRunning} isRunning={running} />
      <div className="game-board">
        <Svg ref={svgEl} width={boardSize.width} height={boardSize.height} />
      </div>
    </div>
  );
};

export default GameOfLife;
