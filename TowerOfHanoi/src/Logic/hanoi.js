export function generateHanoiMoves(
  numberOfDisks,
  source = 0,
  auxiliary = 1,
  destination = 2
) {
  const moves = [];

  function solve(n, from, helper, to) {
    if (n === 0) return;

    solve(n - 1, from, to, helper);

    moves.push({
      from,
      to,
    });

    solve(n - 1, helper, from, to);
  }

  solve(numberOfDisks, source, auxiliary, destination);

  return moves;
}