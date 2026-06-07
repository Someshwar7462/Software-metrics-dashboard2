const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function hashSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function randomInRange(seed, min, max) {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

/** Last 12 months ending with the current month (e.g. Jul 2025 … Jun 2026). */
function getLast12MonthLabels() {
  const labels = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(`${MONTHS[date.getMonth()]} ${date.getFullYear()}`);
  }

  return labels;
}

/**
 * Splits totalCommits across monthCount months using seeded weights.
 * The returned values always sum exactly to totalCommits.
 */
function distributeCommitsAcrossMonths(totalCommits, monthCount, seed) {
  if (totalCommits <= 0) {
    return Array(monthCount).fill(0);
  }

  if (totalCommits < monthCount) {
    const counts = Array(monthCount).fill(0);
    const indices = Array.from({ length: monthCount }, (_, i) => i);

    for (let i = monthCount - 1; i > 0; i--) {
      const j = randomInRange(seed + 300 + i, 0, i);
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    for (let i = 0; i < totalCommits; i++) {
      counts[indices[i]] = 1;
    }

    return counts;
  }

  const weights = Array.from({ length: monthCount }, (_, index) => {
    const base = randomInRange(seed + 200 + index, 5, 20);
    const wave = Math.round(Math.sin(index * 0.6) * 5);
    return Math.max(1, base + wave);
  });

  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  const rawShares = weights.map((weight) => (weight / weightSum) * totalCommits);
  const counts = rawShares.map((share) => Math.floor(share));

  let remainder = totalCommits - counts.reduce((sum, count) => sum + count, 0);

  const fractionalOrder = rawShares
    .map((share, index) => ({ index, fraction: share - Math.floor(share) }))
    .sort((a, b) => b.fraction - a.fraction);

  for (let i = 0; i < remainder; i++) {
    counts[fractionalOrder[i].index]++;
  }

  return counts;
}

/**
 * Generates deterministic dummy metrics for a repository.
 * Monthly commit bars are derived from totalCommits so their sum matches the KPI.
 */
export function generateDummyMetrics(repoKey, totalCommits = 0) {
  const seed = hashSeed(repoKey);

  const criticalBugs = randomInRange(seed + 2, 1, 9);
  const majorBugs = randomInRange(seed + 3, 3, 14);
  const minorBugs = randomInRange(seed + 4, 2, 12);
  const testCoverage = randomInRange(seed + 5, 58, 88);

  const monthLabels = getLast12MonthLabels();
  const baseCoverage = randomInRange(seed + 6, 42, 55);

  const testCoverageHistory = monthLabels.map((month, index) => {
    const progress = index / (monthLabels.length - 1 || 1);
    const noise = randomInRange(seed + 100 + index, -3, 3);
    const coverage = Math.min(
      95,
      Math.round(baseCoverage + progress * (testCoverage - baseCoverage) + noise)
    );
    return { month, coverage };
  });

  testCoverageHistory[testCoverageHistory.length - 1].coverage = testCoverage;

  const commitCounts = distributeCommitsAcrossMonths(
    totalCommits,
    monthLabels.length,
    seed
  );

  const monthlyCommits = monthLabels.map((month, index) => ({
    month,
    commits: commitCounts[index],
  }));

  const bugSeverity = [
    { name: "Critical", value: criticalBugs },
    { name: "Major", value: majorBugs },
    { name: "Minor", value: minorBugs },
  ];

  return {
    criticalBugs,
    majorBugs,
    minorBugs,
    testCoverage,
    testCoverageHistory,
    monthlyCommits,
    bugSeverity,
  };
}
