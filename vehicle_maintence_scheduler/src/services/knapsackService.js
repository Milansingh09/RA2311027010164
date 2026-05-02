export function knapsackWithItems(tasks, capacity) {
  const n = tasks.length;

  const dp = Array.from({ length: n + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const { Duration, Impact } = tasks[i - 1];

    for (let w = 0; w <= capacity; w++) {
      if (Duration <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - Duration] + Impact
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Backtracking
  let w = capacity;
  const selected = [];

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.push(tasks[i - 1]);
      w -= tasks[i - 1].Duration;
    }
  }

  return {
    maxImpact: dp[n][capacity],
    selectedTasks: selected.reverse()
  };
}