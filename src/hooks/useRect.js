import * as d3 from "d3";
import { useCallback } from "react";

export const useRect = ({ svgEl, size, squareSize }) => {
  console.log("[USE RECT] -> render");
  const xScale = d3
    .scaleLinear()
    .domain([0, size.width / squareSize])
    .range([0, size.width]);
  const yScale = d3
    .scaleLinear()
    .domain([0, size.height / squareSize])
    .range([0, size.height]);

  const rowNumber = useCallback(
    (idx) => Math.trunc(idx / (size.width / squareSize)),
    [size.width, squareSize]
  );
  const colNumber = useCallback(
    (idx) => idx % (size.width / squareSize),
    [size.width, squareSize]
  );

  const createRectangles = useCallback(
    (data) => {
      const svg = d3.select(svgEl.current);

      const cells = svg
        // .append("g")
        // .attr("class", "cells")
        .selectAll(".cell")
        .data(data);

      cells.join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", (d) => `cell ${d ? "alive" : "dead"}`)
            .attr("x", (_, i) => xScale(colNumber(i)))
            .attr("y", (_, i) => yScale(rowNumber(i)))
            .attr("width", squareSize)
            .attr("height", squareSize),
        (update) =>
          update
            .attr("class", (d) => `cell ${d ? "alive" : "dead"}`)
            .attr("x", (_, i) => xScale(colNumber(i)))
            .attr("y", (_, i) => yScale(rowNumber(i)))
            .attr("width", squareSize)
            .attr("height", squareSize),
        (exit) => exit.call((exit) => exit.remove())
      );
    },
    [colNumber, rowNumber, svgEl, xScale, yScale, squareSize]
  );

  return { createRectangles };
};
