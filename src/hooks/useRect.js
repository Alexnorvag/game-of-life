import { useCallback } from "react";
import * as d3 from "d3";

export const useRect = ({ svgEl, squareSize }) => {
  const drawRectangles = useCallback(
    (data) => {
      const svg = d3.select(svgEl.current);

      const cells = svg.selectAll(".cell").data(data);

      cells.join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "cell")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("width", squareSize)
            .attr("height", squareSize),
        (update) =>
          update
            .attr("class", "cell")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            .attr("width", squareSize)
            .attr("height", squareSize),

        (exit) => exit.call((exit) => exit.remove())
      );
    },
    [svgEl, squareSize]
  );

  return { drawRectangles };
};
