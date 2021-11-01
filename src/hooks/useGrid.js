import * as d3 from "d3";

export const useGrid = ({ svgEl, size, squareSize }) => {
  console.log("[USE GRID] -> render");
  const x = d3.scaleLinear().range([0, size.width]);
  const y = d3.scaleLinear().range([size.height, 0]);

  const xAxis = () => d3.axisBottom(x).ticks(size.width / squareSize);
  const yAsix = () => d3.axisLeft(y).ticks(size.height / squareSize);

  const createGrid = () => {
    const svg = d3.select(svgEl.current);
    svg
      .append("g")
      .attr("class", "grid-vertical")
      .attr("transform", "translate(0," + size.height + ")")
      .call(xAxis().tickSize(-size.height).tickFormat(""));
    svg
      .append("g")
      .attr("class", "grid-horizontal")
      .call(yAsix().tickSize(-size.width).tickFormat(""));
  };

  return {
    createGrid,
  };
};
