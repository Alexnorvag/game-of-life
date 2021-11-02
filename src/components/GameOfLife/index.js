import { useRef, useEffect, useState } from "react";

import Svg from "../../layout/GameContainer/components/Svg";
import GameControls from "./components/GameOfLifeControls";
import { useGameData } from "./hooks/useGameData";
import { useRect } from "../../hooks";

import "./index.css";

const GameOfLife = ({ width, height }) => {
  const { data, squareSize, boardSize, runGame } = useGameData({
    size: { width, height },
  });

  const svgEl = useRef();

  const { createRectangles } = useRect({
    svgEl,
    size: boardSize,
    squareSize,
  });

  const [running, setRunning] = useState(false);
  const timerId = useRef(0);
  const runTime = 50;

  const toggleGameRunning = () => setRunning((s) => !s);

  useEffect(() => {
    if (running) {
      timerId.current = setInterval(runGame, runTime);
    } else {
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
