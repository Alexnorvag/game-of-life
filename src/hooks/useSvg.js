import { useCallback, useRef } from "react";
import * as d3 from "d3";

export const useSvg = ({ rootEl, size }) => {
  //   const [svgEl, setSvgEl] = useState();
  const svgEl = useRef();
  console.log('rootEl: ', rootEl);

  const createSvg = useCallback(() => {
    svgEl.current = d3
      // const svg = d3
      .select(rootEl)
      .append("svg")
      .attr("width", size.width)
      .attr("height", size.height);

    // setSvgEl(svg);
  }, [rootEl, size]);

  return {
    svgEl: svgEl.current,

    createSvg,
  };
};
