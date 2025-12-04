export interface LeaderboardEntry {
  nickname: string;
  score: number;
}

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { nickname: 'ACE', score: 2500 },
  { nickname: 'LEO', score: 1800 },
  { nickname: 'NOVA', score: 1650 },
  { nickname: 'ZEN', score: 1400 },
  { nickname: 'RIO', score: 1200 },
  { nickname: 'MAX', score: 1100 },
  { nickname: 'LEX', score: 950 },
  { nickname: 'KAI', score: 800 },
];

/**
 * Submits a score to the leaderboard
 * @param nickname - Player's nickname
 * @param score - Player's final score
 * @returns Promise that resolves to true if successful
 */
export async function submitScore(
  nickname: string,
  score: number
): Promise<boolean> {
  // Simulate network delay (500-800ms)
  const delayMs = Math.floor(Math.random() * 300) + 500;
  await delay(delayMs);
  
  // In a real app, this would make an API call
  // For now, just simulate success
  console.log(`Score submitted: ${nickname} - ${score}`);
  return true;
}

/**
 * Fetches the top scores from the leaderboard
 * @returns Promise that resolves to an array of leaderboard entries
 */
export async function fetchTopScores(): Promise<LeaderboardEntry[]> {
  // Simulate network delay (500-800ms)
  const delayMs = Math.floor(Math.random() * 300) + 500;
  await delay(delayMs);
  
  // Return sorted mock data (highest to lowest)
  return [...mockLeaderboard].sort((a, b) => b.score - a.score);
}

