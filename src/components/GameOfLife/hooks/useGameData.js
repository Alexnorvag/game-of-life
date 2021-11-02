import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cellsGenerate, prevDividend } from "../../../utils";

export const useGameData = ({ size, squareSize, runTime }) => {
  const [running, setRunning] = useState(false);
  const timerId = useRef(0);

  const boardSize = useMemo(
    () => ({
      width: prevDividend(size.width, squareSize),
      height: prevDividend(size.height, squareSize),
    }),
    [size, squareSize]
  );

  const colsNumber = useMemo(
    () => boardSize.width / squareSize,
    [boardSize, squareSize]
  );
  const rowsNumber = useMemo(
    () => boardSize.height / squareSize,
    [boardSize, squareSize]
  );

  const [data, setData] = useState(() =>
    cellsGenerate({ columns: colsNumber, rows: rowsNumber, squareSize })
  );

  const findNeighbors = useCallback(
    (cell) => {
      let neighbours = [];

      const { r, c } = cell;
      neighbours.push(data[(r - 1) * colsNumber + (c - 1)]);
      neighbours.push(data[r * colsNumber + (c - 1)]);
      neighbours.push(data[(r + 1) * colsNumber + (c - 1)]);
      neighbours.push(data[(r - 1) * colsNumber + c]);
      neighbours.push(data[(r + 1) * colsNumber + c]);
      neighbours.push(data[(r - 1) * colsNumber + (c + 1)]);
      neighbours.push(data[r * colsNumber + (c + 1)]);
      neighbours.push(data[(r + 1) * colsNumber + (c + 1)]);

      return neighbours.filter((neighbour) => neighbour && neighbour.alive);
    },
    [data, colsNumber]
  );

  const updateCellState = useCallback(
    (cell) => {
      const neighbours = findNeighbors(cell);

      return {
        ...cell,
        alive: cell.alive
          ? neighbours.length >= 2 && neighbours.length <= 3
          : neighbours.length === 3,
      };
    },
    [findNeighbors]
  );

  const toggleGameRun = () => setRunning((s) => !s);

  const runGame = useCallback(() => {
    setData((c) => c.map(updateCellState));
  }, [updateCellState]);

  useEffect(() => {
    if (running) {
      timerId.current = setInterval(runGame, runTime);
    } else {
      clearInterval(timerId.current);
    }

    return () => clearInterval(timerId.current);
  }, [running, runGame, runTime]);

  return {
    data,
    squareSize,
    boardSize,
    isGameRun: running,

    toggleGameRun,
  };
};
