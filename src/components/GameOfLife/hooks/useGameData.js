import { useCallback, useMemo, useState } from "react";

import { firstGeneration } from "../../../utils";

export const useGameData = ({ size, squareSize }) => {
  const cellsNumber = useMemo(
    () => (size.width * size.height) / Math.pow(squareSize, 2),
    [size, squareSize]
  );
  const [data, setData] = useState(() => firstGeneration(cellsNumber));

  const getDataIndex = (neighbourIdx, dataLenght) => {
    if (neighbourIdx < 0) {
      return dataLenght - neighbourIdx + 1;
    }

    return neighbourIdx;
  };
  const colsNumber = size.width / squareSize;

  const findNeighbors = useCallback(
    (cellIdx) => {
      let neighbours = [];
      neighbours.push(data[getDataIndex(cellIdx - colsNumber - 1)]);
      neighbours.push(data[getDataIndex(cellIdx - colsNumber)]);
      neighbours.push(data[getDataIndex(cellIdx - colsNumber + 1)]);
      neighbours.push(data[getDataIndex(cellIdx - 1)]);
      neighbours.push(data[getDataIndex(cellIdx + 1)]);
      neighbours.push(data[getDataIndex(cellIdx + colsNumber - 1)]);
      neighbours.push(data[getDataIndex(cellIdx + colsNumber)]);
      neighbours.push(data[getDataIndex(cellIdx + colsNumber + 1)]);

      return neighbours.filter((neighbour) => neighbour);
    },
    [data, colsNumber]
  );

  const updateCellState = useCallback(
    (cell, cellIdx) => {
      const neighbours = findNeighbors(cellIdx);

      return cell
        ? neighbours.length >= 2 && neighbours.length <= 3
        : neighbours.length === 3;
    },
    [findNeighbors]
  );

  const runGame = useCallback(() => {
    setData((c) => c.map(updateCellState));
  }, [updateCellState]);

  //   useEffect(() => {
  //     if (running) {
  //       timerId.current = setInterval(runGame, runTime);
  //       console.log("TIMER ID: ", timerId.current);
  //     } else {
  //       clearInterval(timerId.current);
  //     }

  //     return () => clearInterval(timerId.current);
  //   }, [running, runGame]);

  return {
    data,

    runGame,
    // isGameRunning: running,

    // toggleGameRunning,
  };
};
