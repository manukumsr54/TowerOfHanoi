function Controls({
  numberOfDisks,
  onDiskChange,
  onReset,
  onUndo,
  onSolve,
  onPause,
  isSolving,
  isPaused,
  moveCount,
  minimumMoves,
}) {
  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="disk-count">Disks</label>

        <select
          id="disk-count"
          value={numberOfDisks}
          onChange={(e) => onDiskChange(Number(e.target.value))}
          disabled={isSolving}
        >
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
        </select>
      </div>

      <div className="stats">
        <div>
          <span>Moves</span>
          <strong>{moveCount}</strong>
        </div>

        <div>
          <span>Minimum</span>
          <strong>{minimumMoves}</strong>
        </div>
      </div>

      <div className="button-group">
        <button onClick={onUndo} disabled={isSolving}>
          Undo
        </button>

        <button onClick={onReset}>
          Reset
        </button>

        {!isSolving ? (
          <button onClick={onSolve}>
            Solve
          </button>
        ) : (
          <button onClick={onPause}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Controls;