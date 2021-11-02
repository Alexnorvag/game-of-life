import GameOfLife from "../../components/GameOfLife";
import { useWindowSize } from "../../hooks";

const GameContainer = () => {
  const windowSize = useWindowSize({ margin: 15 });
  return (
    <div className="game-container">
      <GameOfLife {...windowSize} />
    </div>
  );
};

export default GameContainer;
