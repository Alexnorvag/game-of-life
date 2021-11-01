// import { useEffect, useMemo, useRef, useState } from "react";

// import GameControls from "./GameControls";
// import { useGridData, useWindowSize } from "../../hooks";
// import { prevDividend } from "../../utils";

// const GameLayout = ({ children }) => {
//   const windowSize = useWindowSize({ margin: 15 });

//   const squareSize = 10;
//   const width = useMemo(
//     () => prevDividend(windowSize.width, squareSize),
//     [windowSize.width]
//   );
//   const height = useMemo(
//     () => prevDividend(windowSize.height, squareSize),
//     [windowSize.height]
//   );

//   const { cells, runGeneration } = useGridData({
//     size: { width, height },
//     squareSize,
//   });

//   console.log("[GAME_LAYOUT] -> render");

//   const [running, setRunning] = useState(false);
//   const timerId = useRef(0);
//   const runTime = 50;

//   const toggleGeneration = () => setRunning((s) => !s);

//   // useEffect(() => {
//   //   if (running) {
//   //     timerId.current = setInterval(runGeneration, runTime);
//   //   } else {
//   //     clearInterval(timerId.current);
//   //   }

//   //   return () => clearInterval(timerId.current);
//   // }, [running, runGeneration]);

//   return (
//     <>
//       <GameControls isRunning={running} onClick={toggleGeneration} />
//       {children(width, height, cells, squareSize)}
//     </>
//   );
// };

// export default GameLayout;
