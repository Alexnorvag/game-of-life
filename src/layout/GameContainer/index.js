import { useWindowSize } from "../../hooks";
import GameOfLife from "../../components/GameOfLife";

const GameContainer = () => {
  console.log("[GAME CONTAINER] -> render");
  const windowSize = useWindowSize({ margin: 15 });

  return (
    <div className="game-container">
      <GameOfLife {...windowSize} />
    </div>
  );
};

export default GameContainer;
