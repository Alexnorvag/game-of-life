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

  const getDataIndex = (neighbourIdx, dataLenght) => {
    if (neighbourIdx < 0) {
      return dataLenght - neighbourIdx + 1;
    }

    return neighbourIdx;
  };

  const colsNumber = useMemo(
    () => boardSize.width / squareSize,
    [boardSize, squareSize]
  );

  const findNeighbors = useCallback(
    (cellIdx) => {
      let neighbours = [];
      neighbours.push(
        data[getDataIndex(cellIdx - colsNumber - 1, data.length)]
      );
      neighbours.push(data[getDataIndex(cellIdx - colsNumber, data.length)]);
      neighbours.push(
        data[getDataIndex(cellIdx - colsNumber + 1, data.length)]
      );
      neighbours.push(data[getDataIndex(cellIdx - 1, data.length)]);
      neighbours.push(data[getDataIndex(cellIdx + 1, data.length)]);
      neighbours.push(
        data[getDataIndex(cellIdx + colsNumber - 1, data.length)]
      );
      neighbours.push(data[getDataIndex(cellIdx + colsNumber, data.length)]);
      neighbours.push(
        data[getDataIndex(cellIdx + colsNumber + 1, data.length)]
      );

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

  return {
    data,
    squareSize,
    boardSize,

    runGame,
  };
};
