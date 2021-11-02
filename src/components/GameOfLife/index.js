import { useRef, useEffect } from "react";

import { useGameData } from "./hooks/useGameData";
import { useRect } from "../../hooks";
import GameControls from "./components/GameOfLifeControls";
import Svg from "../Svg/Svg";

import "./index.css";

const GameOfLife = ({ width, height }) => {
  const { data, squareSize, boardSize, isGameRun, toggleGameRun } = useGameData(
    {
      size: { width, height },
      updateTime: 50,
      squareSize: 10,
    }
  );

  const svgEl = useRef();
  const { drawRectangles } = useRect({ svgEl, squareSize });

  useEffect(() => {
    const aliveCells = data.filter(({ alive }) => alive);

    drawRectangles(aliveCells);
  }, [drawRectangles, data]);

  return (
    <div className="game-of-life">
      <GameControls onClick={toggleGameRun} isStart={isGameRun} />
      <div className="game-board">
        <Svg ref={svgEl} width={boardSize.width} height={boardSize.height} />
      </div>
    </div>
  );
};

export default GameOfLife;
