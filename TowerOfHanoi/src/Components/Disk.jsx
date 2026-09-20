function Disk({ size, towerIndex, level }) {
  const towerPositions = ["16.66%", "50%", "83.33%"];

  const diskStyle = {
    left: towerPositions[towerIndex],
    bottom: `${42 + level * 34}px`,
    width: `${70 + size * 22}px`,
  };

  return (
    <div
      className="disk"
      style={diskStyle}
      aria-label={`Disk ${size}`}
    >
      {size}
    </div>
  );
}

export default Disk;