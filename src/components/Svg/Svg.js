import { forwardRef } from "react";

const Svg = forwardRef(({ width, height }, ref) => (
  <svg
    ref={ref}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
  />
));

export default Svg;
