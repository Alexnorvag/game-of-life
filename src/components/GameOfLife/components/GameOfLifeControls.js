import { ReactComponent as PlayIcon } from "../../../assets/svg/play.svg";
import { ReactComponent as PauseIcon } from "../../../assets/svg/pause.svg";

const GameControls = ({ onClick, isRunning }) => {
  return (
    <div className="controls">
      {isRunning ? (
        <PauseIcon onClick={onClick} />
      ) : (
        <PlayIcon onClick={onClick} />
      )}
    </div>
  );
};

export default GameControls;
