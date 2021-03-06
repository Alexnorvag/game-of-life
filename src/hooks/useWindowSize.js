import { useCallback, useEffect, useState } from "react";

export const useWindowSize = ({ margin = 0 }) => {
  const getDimensionSize = (dimension, margin) =>
    dimension - (dimension * margin) / 100;

  const getSize = useCallback(() => {
    const {
      screen: { height, width },
    } = window;

    return {
      width: getDimensionSize(width, margin),
      height: getDimensionSize(height, margin),
    };
  }, [margin]);

  const [windowSize, setWindowSize] = useState({ ...getSize() });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ ...getSize() });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [getSize]);

  return windowSize;
};
