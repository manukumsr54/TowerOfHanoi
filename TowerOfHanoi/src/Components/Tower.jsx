function Tower({ name, index, selected, onClick }) {
  return (
    <button
      className={`tower ${selected ? "selected" : ""}`}
      onClick={() => onClick(index)}
      aria-label={`Tower ${name}`}
    >
      <div className="tower-rod"></div>

      <div className="tower-base"></div>

      <span className="tower-name">{name}</span>
    </button>
  );
}

export default Tower;