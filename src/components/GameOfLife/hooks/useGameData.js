import { useCallback, useMemo, useState } from "react";

import { firstGeneration, prevDividend } from "../../../utils";

export const useGameData = ({ size }) => {
  const squareSize = 10;

  const boardSize = useMemo(
    () => ({
      width: prevDividend(size.width, squareSize),
      height: prevDividend(size.height, squareSize),
    }),
    [size]
  );

  const cellsNumber = useMemo(
    () => (boardSize.width * boardSize.height) / Math.pow(squareSize, 2),
    [boardSize, squareSize]
  );

  const [data, setData] = useState(() => firstGeneration(cellsNumber));

  const getDataIndex = useCallback(
    (neighbourIdx) => {
      if (neighbourIdx < 0) {
        return cellsNumber - neighbourIdx + 1;
      }

      return neighbourIdx;
    },
    [cellsNumber]
  );

  const colsNumber = useMemo(
    () => boardSize.width / squareSize,
    [boardSize, squareSize]
  );

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
    [data, colsNumber, getDataIndex]
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

  return {
    data,
    squareSize,
    boardSize,

    runGame,
  };
};
