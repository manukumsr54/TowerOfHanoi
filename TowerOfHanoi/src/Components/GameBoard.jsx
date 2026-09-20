import Tower from "./Tower";
import Disk from "./Disk";

function GameBoard({ towers, selectedTower, onTowerClick }) {
  return (
    <div className="game-board">
      {["A", "B", "C"].map((name, index) => (
        <Tower
          key={name}
          name={name}
          index={index}
          selected={selectedTower === index}
          onClick={onTowerClick}
        />
      ))}

      {towers.map((tower, towerIndex) =>
        tower.map((disk, level) => (
          <Disk
            key={disk}
            size={disk}
            towerIndex={towerIndex}
            level={level}
          />
        ))
      )}
    </div>
  );
}

export default GameBoard;