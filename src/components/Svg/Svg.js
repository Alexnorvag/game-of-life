import { useRef } from "react";

const Svg = ({ width, height, children }) => {
  const ref = useRef();

  console.log("[SVG] -> render");

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ border: "2px solid gold" }}
    >
      {children(ref)}
    </svg>
  );
};

export default Svg;
