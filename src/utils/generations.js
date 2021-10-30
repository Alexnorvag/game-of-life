import * as d3 from "d3";

export const cellsGenerate = (rows, columns, squareSize, radius) => {
  const cells = d3.range(0, rows * columns).map((d) => {
    const col = d % columns;
    const row = (d - col) / columns;
    const alive = Math.random() > 0.5 ? true : false;
    return {
      r: row,
      c: col,
      x: col * squareSize + radius,
      y: row * squareSize + radius,
      alive,
    };
  });

  return cells;
};
