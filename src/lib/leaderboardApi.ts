export interface LeaderboardEntry {
  nickname: string;
  score: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, score }),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit score: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
}

/**
 * Fetches the top scores from the leaderboard
 * @returns Promise that resolves to an array of leaderboard entries
 */
export async function fetchTopScores(): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);

    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
    }

    const data = await response.json();
    // Ensure we return only nickname and score (remove timestamp if present)
    return data.map((entry: any) => ({
      nickname: entry.nickname,
      score: entry.score,
    }));
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    // Return empty array on error so UI doesn't break
    return [];
  }
}

