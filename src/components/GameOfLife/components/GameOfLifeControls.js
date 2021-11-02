import { ReactComponent as PlayIcon } from "../../../assets/svg/play.svg";
import { ReactComponent as PauseIcon } from "../../../assets/svg/pause.svg";

const GameControls = ({ onClick, isStart }) => {
  return (
    <div className="controls">
      {isStart ? (
        <PauseIcon onClick={onClick} />
      ) : (
        <PlayIcon onClick={onClick} />
      )}
    </div>
  );
};

export default GameControls;
