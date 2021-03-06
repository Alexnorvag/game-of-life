import * as d3 from "d3";

export const cellsGenerate = ({ rows, columns, squareSize }) => {
  const cells = d3.range(0, rows * columns).map((d) => {
    const col = d % columns;
    const row = (d - col) / columns;
    const alive = Math.random() > 0.5;
    return {
      r: row,
      c: col,
      x: col * squareSize,
      y: row * squareSize,
      alive,
    };
  });

  return cells;
};

export const firstGeneration = (length) => {
  const generation = Array.from({ length }, () => Math.random() > 0.5);
  return generation;
};

export const generateEmptyGrid = (numRows, numCols) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};
