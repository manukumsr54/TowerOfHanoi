import { useEffect, useRef, useState } from "react";

import GameBoard from "./Components/GameBoard";
import Controls from "./Components/Controls";
import { generateHanoiMoves } from "./Logic/hanoi";

import "./App.css";

const INITIAL_DISKS = 3;
const MOVE_DURATION = 700;

function createInitialTowers(numberOfDisks) {
  return [
    Array.from(
      { length: numberOfDisks },
      (_, index) => numberOfDisks - index
    ),
    [],
    [],
  ];
}

function App() {
  const [numberOfDisks, setNumberOfDisks] = useState(INITIAL_DISKS);

  const [towers, setTowers] = useState(
    createInitialTowers(INITIAL_DISKS)
  );

  const [selectedTower, setSelectedTower] = useState(null);

  const [moveCount, setMoveCount] = useState(0);

  const [history, setHistory] = useState([]);

  const [isSolving, setIsSolving] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const [gameWon, setGameWon] = useState(false);

  const pauseRef = useRef(false);
  const stopSolverRef = useRef(false);

  const minimumMoves = Math.pow(2, numberOfDisks) - 1;

  // --------------------------------------------------
  // Reset game
  // --------------------------------------------------

  function resetGame(disks = numberOfDisks) {
    stopSolverRef.current = true;
    pauseRef.current = false;

    setIsSolving(false);
    setIsPaused(false);
    setSelectedTower(null);
    setMoveCount(0);
    setHistory([]);
    setGameWon(false);

    setTowers(createInitialTowers(disks));
  }

  // --------------------------------------------------
  // Change number of disks
  // --------------------------------------------------

  function handleDiskChange(disks) {
    setNumberOfDisks(disks);
    resetGame(disks);
  }

  // --------------------------------------------------
  // Check whether a move is valid
  // --------------------------------------------------

  function isValidMove(from, to, currentTowers = towers) {
    if (from === to) {
      return false;
    }

    const sourceTower = currentTowers[from];
    const destinationTower = currentTowers[to];

    if (sourceTower.length === 0) {
      return false;
    }

    const movingDisk = sourceTower[sourceTower.length - 1];

    if (destinationTower.length === 0) {
      return true;
    }

    const destinationTop =
      destinationTower[destinationTower.length - 1];

    return movingDisk < destinationTop;
  }

  // --------------------------------------------------
  // Perform a move
  // --------------------------------------------------

  function performMove(from, to) {
    let successful = false;

    setTowers((currentTowers) => {
      if (!isValidMove(from, to, currentTowers)) {
        return currentTowers;
      }

      const newTowers = currentTowers.map((tower) => [...tower]);

      const disk = newTowers[from].pop();

      newTowers[to].push(disk);

      successful = true;

      return newTowers;
    });

    return successful;
  }

  // --------------------------------------------------
  // Manual tower selection
  // --------------------------------------------------

  function handleTowerClick(towerIndex) {
    if (isSolving || gameWon) {
      return;
    }

    // First click = source
    if (selectedTower === null) {
      if (towers[towerIndex].length === 0) {
        return;
      }

      setSelectedTower(towerIndex);
      return;
    }

    // Second click = destination
    const from = selectedTower;
    const to = towerIndex;

    if (!isValidMove(from, to)) {
      setSelectedTower(null);
      return;
    }

    // Save current state for undo
    setHistory((previousHistory) => [
      ...previousHistory,
      towers,
    ]);

    performMove(from, to);

    setMoveCount((count) => count + 1);

    setSelectedTower(null);
  }

  // --------------------------------------------------
  // Check for winning condition
  // --------------------------------------------------

  useEffect(() => {
    if (towers[2].length === numberOfDisks) {
      setGameWon(true);
    }
  }, [towers, numberOfDisks]);

  // --------------------------------------------------
  // Undo
  // --------------------------------------------------

  function handleUndo() {
    if (isSolving || history.length === 0) {
      return;
    }

    const previousState = history[history.length - 1];

    setTowers(previousState);

    setHistory((previousHistory) =>
      previousHistory.slice(0, -1)
    );

    setMoveCount((count) => Math.max(0, count - 1));

    setGameWon(false);
    setSelectedTower(null);
  }

  // --------------------------------------------------
  // Pause / Resume
  // --------------------------------------------------

  function handlePause() {
    pauseRef.current = !pauseRef.current;

    setIsPaused(pauseRef.current);
  }

  // --------------------------------------------------
  // Wait helper
  // --------------------------------------------------

  function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // --------------------------------------------------
  // Automatic solver
  // --------------------------------------------------

  async function solveGame() {
    if (isSolving || gameWon) {
      return;
    }

    stopSolverRef.current = false;
    pauseRef.current = false;

    setIsSolving(true);
    setIsPaused(false);
    setSelectedTower(null);

    // Start from a fresh board
    const startingTowers = createInitialTowers(numberOfDisks);

    setTowers(startingTowers);
    setMoveCount(0);
    setHistory([]);

    const moves = generateHanoiMoves(numberOfDisks);

    await wait(500);

    for (const move of moves) {
      if (stopSolverRef.current) {
        return;
      }

      // Wait while paused
      while (pauseRef.current) {
        await wait(100);
      }

      if (stopSolverRef.current) {
        return;
      }

      setTowers((currentTowers) => {
        const newTowers = currentTowers.map((tower) => [
          ...tower,
        ]);

        const disk = newTowers[move.from].pop();

        newTowers[move.to].push(disk);

        return newTowers;
      });

      setMoveCount((count) => count + 1);

      // Give CSS animation time to complete
      await wait(MOVE_DURATION);
    }

    setIsSolving(false);
    setGameWon(true);
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <p className="eyebrow">ALGORITHM VISUALIZER</p>

          <h1 className="h1">Tower of Hanoi</h1>

          <p className="subtitle">
            Explore recursion through movement.
          </p>
        </div>
      </header>

      <section className="game-container">
        <Controls
          numberOfDisks={numberOfDisks}
          onDiskChange={handleDiskChange}
          onReset={() => resetGame()}
          onUndo={handleUndo}
          onSolve={solveGame}
          onPause={handlePause}
          isSolving={isSolving}
          isPaused={isPaused}
          moveCount={moveCount}
          minimumMoves={minimumMoves}
        />
        <div className="game-message">
          {gameWon ? (
            <>
              <strong>Completed !🎉</strong>
              <span>
                You solved it in {moveCount} moves.
              </span>
            </>
          ) : selectedTower !== null ? (
            <span>
              Select a destination tower.
            </span>
          ) : (
            <span>
              Select a tower to move its top disk.
            </span>
          )}
        </div>

        <GameBoard
          towers={towers}
          selectedTower={selectedTower}
          onTowerClick={handleTowerClick}
        />

        
      </section>
    </main>
  );
}

export default App;