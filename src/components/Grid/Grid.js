import { useEffect } from "react";
import * as d3 from "d3";

import "./Grid.css";

const Grid = ({ data, svgRef, squareSize }) => {
  console.log("[Grid] -> render");

  useEffect(() => {
    if (!data) return;

    const board = d3.select(svgRef.current);
    const cell = board.selectAll(".cell").data(data);

    cell.attr("class", function (d) {
      return "cell " + (d.alive ? "alive" : "dead");
    });

    cell
      .enter()
      .append("rect")
      .attr("class", function (d) {
        return "cell " + (d.alive ? "alive" : "dead");
      })
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", squareSize)
      .attr("height", squareSize);

    // .each(function (d) {
    //   d3.select(this).on("mousedown", function (d) {
    //     // isMouseDown = true;
    //     // click(d, d3.event.button === 0);
    //     return false;
    //   });
    //   // .on("mouseover", function (d) {
    //   //   if (isMouseDown) click(d, d3.event.button === 0);
    //   //   return false;
    //   // })
    //   // .on("mouseup", function (d) {
    //   //   isMouseDown = false;
    //   //   d3.event.preventDefault();
    //   //   d3.event.stopPropagation();
    //   //   return false;
    //   // });
    // });

    cell.exit().remove();
  }, [data, squareSize, svgRef]);

  return null;

  // const msTimestep = 1000;

  // const randomField = useCallback(() => {
  //   console.log("[RANDOM FIELD]");

  //   return _.map(d3.range(cellSquare), function (i) {
  //     return _.map(d3.range(cellSquare), function (j) {
  //       return Math.random() < 0.5 ? 1 : 0;
  //     });
  //   });
  // }, [cellSquare]);

  // useEffect(() => {
  //   let xScale = d3
  //     .scaleLinear()
  //     .domain([0, width / cellSquare])
  //     .range([0, width]);
  //   let yScale = d3
  //     .scaleLinear()
  //     .domain([0, height / cellSquare])
  //     .range([0, height]);

  //   let field;

  //   const svgElement = d3
  //     .select(svgRef.current)
  //     .attr("height", height)
  //     .attr("width", width)
  //     .on("click", function () {
  //       field = randomField();
  //     });

  //   field = randomField();

  //   const createNewGeneration = (states) => {
  //     let nextGen = new Array();
  //     const ccx = states.length;
  //     for (let x = 0; x < ccx; x++) {
  //       const ccy = states[x].length;
  //       nextGen[x] = new Array();
  //       for (let y = 0; y < ccy; y++) {
  //         const ti = y - 1 < 0 ? ccy - 1 : y - 1; // top index
  //         const ri = x + 1 === ccx ? 0 : x + 1; // right index
  //         const bi = y + 1 === ccy ? 0 : y + 1; // bottom index
  //         const li = x - 1 < 0 ? ccx - 1 : x - 1; // left index

  //         const thisState = states[x][y];
  //         let liveNeighbours = 0;
  //         liveNeighbours += states[li][ti] ? 1 : 0;
  //         liveNeighbours += states[x][ti] ? 1 : 0;
  //         liveNeighbours += states[ri][ti] ? 1 : 0;
  //         liveNeighbours += states[li][y] ? 1 : 0;
  //         liveNeighbours += states[ri][y] ? 1 : 0;
  //         liveNeighbours += states[li][bi] ? 1 : 0;
  //         liveNeighbours += states[x][bi] ? 1 : 0;
  //         liveNeighbours += states[ri][bi] ? 1 : 0;

  //         let newState = false;

  //         if (thisState) {
  //           newState = liveNeighbours === 2 || liveNeighbours === 3 ? 1 : 0;
  //         } else {
  //           newState = liveNeighbours === 3 ? 1 : 0;
  //         }

  //         nextGen[x][y] = newState;
  //       }
  //     }

  //     return nextGen;
  //   };

  //   const render = (data) => {
  //     const up = svgElement.selectAll("g.row").data(data);
  //     const en = up.enter();

  //     en.append("svg:g").classed("row", true);

  //     const upSquare = up.selectAll("g.square").data((d) => {
  //       return d;
  //     });
  //     const enSquare = upSquare.enter();

  //     enSquare
  //       .append("g")
  //       .classed("square", true)
  //       .append("rect")
  //       .attr("x", function (d, i, j) {
  //         return xScale(i);
  //       })
  //       .attr("y", function (d, i, j) {
  //         return yScale(i);
  //       })
  //       .attr("width", cellSquare)
  //       .attr("height", cellSquare);

  //     // Finally, just switch class on and off to visualize binary state
  //     upSquare.classed("on", function (d) {
  //       return d === 1;
  //     });
  //   };

  //   render(field);

  //   const iterate = () => {
  //     field = createNewGeneration(field);
  //     console.log("[TIMER CHEECK] -> field: ", field);

  //     render(field);

  //     // d3.timer(iterate, msTimestep);

  //     return true;
  //   };

  //   // d3.timer(iterate, 0, 10000);
  //   // d3.timer(iterate, 0, msTimestep);
  // }, [cellSquare, svgRef, width, height, randomField]);

  // return null;

  // const Grid = ({ data, cellSquare }) => {
  // const Grid = ({ data, cellSquare, svgRef }) => {
  // const square = 20;

  // const squaresRow = useMemo(() => Math.floor(width / square), []);
  // const squaresColumn = useMemo(() => Math.floor(height / square), []);
  // console.log("squaresRow: ", squaresRow);
  // console.log("squaresColumn: ", squaresColumn);

  // const getRandomColor = () => (Math.round(Math.random()) ? "#FFF" : "#000");

  // useEffect(() => {
  //   const svgElement = d3.select(svgRef.current);

  //    data.map((rows) => {
  //     // console.log("[DATA] -> rows: ", rows);
  //      rows.map((column) => )
  //   })

  //   // Array.from({ length: squaresColumn }, (_, i) => ({
  //   //   index: i,
  //   //   fill: getRandomColor,
  //   // })).map((squareItem, n) => {
  //   //   const rows = svgElement
  //   //     .selectAll(`rect .row-${n + 1}`)
  //   //     .data(d3.range(squaresRow))
  //   //     .enter()
  //   //     .append("rect")
  //   //     .attr("class", function (d, i) {
  //   //       return `square row-${n + 1} col-${i + 1}`;
  //   //     })
  //   //     .attr("id", function (d, i) {
  //   //       return `square row-${n + 1} col-${i + 1}`;
  //   //     })
  //   //     .attr("width", square)
  //   //     .attr("height", square)
  //   //     .attr("x", function (d, i) {
  //   //       return i * square;
  //   //     })
  //   //     .attr("y", function (d, i) {
  //   //       return n * square;
  //   //     })
  //   //     .attr("fill", squareItem.fill)
  //   //     .attr("stroke", "#FDBB30");

  //   //   //  // test with some feedback
  //   //   //  var test = rows.on('mouseover', function (d, i) {
  //   //   //   d3.select('#grid-ref').text(function () {
  //   //   //     return 'row: ' + (n + 1) + ' | ' + 'column: ' + (i + 1);
  //   //   //   });
  //   //   //   d3.selectAll('.square').attr('fill', 'white');
  //   //   //   d3.select(this).attr('fill', '#7AC143');
  //   //   // });

  //   //   return rows;
  //   // });
  // }, []);
  // }, [squaresColumn, squaresRow, svgRef]);

  // useEffect(() => {
  //   const svgElement = d3.select(svgRef.current);

  //   data.forEach(
  //     (row, rowIndex) => {
  //       const rows = svgElement
  //         .selectAll(`rect .row-${rowIndex + 1}`)
  //         .data(row)
  //         .enter()
  //         .append("rect")
  //         .attr("class", function (d, i) {
  //           return `square row-${rowIndex + 1} col-${i + 1}`;
  //         })
  //         .attr("id", function (d, i) {
  //           return `square row-${rowIndex + 1} col-${i + 1}`;
  //         })
  //         .attr("width", cellSquare)
  //         .attr("height", cellSquare)
  //         .attr("x", function (d, i) {
  //           return i * cellSquare;
  //         })
  //         .attr("y", function (d, i) {
  //           return rowIndex * cellSquare;
  //         })
  //         .attr("fill", (d) => (d ? "#000" : "#FFF"));
  //     }
  //     // rows.forEach((cell, cellIndex, cells) => {

  //     // })
  //   );

  //   console.log("svgElement: ", svgElement);
  // }, [svgRef, cellSquare, data]);

  // return null;

  // return (
  //   <>
  //     {data.map((rows, rowIndex) =>
  //       rows.map((column, columnIndex) => (
  //         <Rect
  //           key={rowIndex + columnIndex}
  //           width={cellSquare}
  //           height={cellSquare}
  //           x={columnIndex * cellSquare}
  //           y={rowIndex * cellSquare}
  //           fill={column ? "#000" : "#FFF"}
  //           // stroke="#FDBB30"
  //         />
  //       ))
  //     )}
  //   </>
  // );
  // return (
  //    <section id="grid">
  //      <Svg width={width} height={height} /* data={d3.range(squaresRow)} */>
  //        {(ref) => {
  //         const svgElement = d3.select(ref.current);
  //         return Array.from({ length: squaresColumn }, (_, i) => i + 1).map(
  //           (n) => {
  //             const rows = svgElement
  //               .selectAll("rect" + " .row-" + (n + 1))
  //               .data(d3.range(squaresRow))
  //               .enter()
  //               .append("rect")
  //               .attr({
  //                 // class: function (d, i) {
  //                 //   return "square row-" + (n + 1) + " " + "col-" + (i + 1);
  //                 // },
  //                 // id: function (d, i) {
  //                 //   return "s-" + (n + 1) + (i + 1);
  //                 // },
  //                 width: square,
  //                 height: square,
  //                 x: function (d, i) {
  //                   return i * square;
  //                 },
  //                 y: n * square,
  //                 fill: "#fff",
  //                 stroke: "#FDBB30",
  //               });

  //             console.log("rows: ", rows);
  //             console.log("svgElement: ", svgElement);
  //             // svgElement
  //             //   .selectAll("rect")
  //             //   .data(d3.range(squaresRow))
  //             //   .join("rect")
  //             //   .attr("width", 3)
  //             //   .attr("height", 3)
  //             //   .attr("x", (d) => d[0])
  //             //   .attr("y", (d) => d[1]);

  //             // console.log("svgElement: ", svgElement);

  //             return rows;
  //           }
  //         );
  //        }}
  //      </Svg>
  //    </section>
  // );
};

export default Grid;
