import { useCallback, useEffect, useMemo, useState } from "react";

import { cellsGenerate } from "../utils";

export const useGridData = ({ size, squareSize }) => {
  const [cells, setCells] = useState();

  const colsNumber = useMemo(
    () => Math.ceil(size.width / squareSize),
    [size.width, squareSize]
  );
  const rowsNumber = useMemo(
    () => Math.ceil(size.height / squareSize),
    [size.height, squareSize]
  );

  const findNeighbors = useCallback(
    (cell) => {
      let neighbours = [];

      const { r, c } = cell;
      neighbours.push(cells[(r - 1) * colsNumber + (c - 1)]);
      neighbours.push(cells[r * colsNumber + (c - 1)]);
      neighbours.push(cells[(r + 1) * colsNumber + (c - 1)]);
      neighbours.push(cells[(r - 1) * colsNumber + c]);
      neighbours.push(cells[(r + 1) * colsNumber + c]);
      neighbours.push(cells[(r - 1) * colsNumber + (c + 1)]);
      neighbours.push(cells[r * colsNumber + (c + 1)]);
      neighbours.push(cells[(r + 1) * colsNumber + (c + 1)]);

      return neighbours.filter(
        (neighbour) => neighbour && neighbour.alive === true
      );
    },
    [cells, colsNumber]
  );

  const updateCellState = (cell) => {
    const neighbours = findNeighbors(cell);

    return {
      ...cell,
      alive:
        (cell.alive && neighbours.length >= 2 && neighbours.length <= 3) ||
        (!cell.alive && neighbours.length === 3),
    };
  };

  const runGeneration = () => {
    setCells((c) => c.map((cell) => updateCellState(cell)));
  };

  useEffect(() => {
    if (colsNumber && rowsNumber) {
      setCells(cellsGenerate(rowsNumber, colsNumber, squareSize));
    }
  }, [colsNumber, rowsNumber, squareSize]);

  return {
    cells,

    runGeneration,
  };
};
