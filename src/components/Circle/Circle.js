import { useEffect } from "react";
import * as d3 from "d3";

const Circle = ({ testRef }) => {
  useEffect(() => {
    const svgElement = d3.select(testRef.current);
    svgElement.append("circle").attr("cx", 150).attr("cy", 70).attr("r", 50);
  }, [testRef]);

  return null;
};

export default Circle;
