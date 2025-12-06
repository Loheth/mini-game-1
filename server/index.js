import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const LEADERBOARD_FILE = path.join(__dirname, 'leaderboard.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize leaderboard file if it doesn't exist
if (!fs.existsSync(LEADERBOARD_FILE)) {
  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify([], null, 2));
}

// Helper function to read leaderboard
function readLeaderboard() {
  try {
    const data = fs.readFileSync(LEADERBOARD_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leaderboard:', error);
    return [];
  }
}

// Helper function to write leaderboard
function writeLeaderboard(data) {
  try {
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing leaderboard:', error);
    return false;
  }
}

// GET /api/leaderboard - Get top scores
app.get('/api/leaderboard', (req, res) => {
  try {
    const leaderboard = readLeaderboard();
    // Sort by score descending and return top 10
    const topScores = leaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    res.json(topScores);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// POST /api/leaderboard - Submit a score
app.post('/api/leaderboard', (req, res) => {
  try {
    const { nickname, score } = req.body;

    // Validation
    if (!nickname || typeof nickname !== 'string' || nickname.trim().length === 0) {
      return res.status(400).json({ error: 'Nickname is required' });
    }
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ error: 'Valid score is required' });
    }

    const leaderboard = readLeaderboard();
    
    // Add new entry
    const newEntry = {
      nickname: nickname.trim().substring(0, 20), // Limit nickname length
      score: Math.floor(score), // Ensure integer score
      timestamp: new Date().toISOString()
    };

    leaderboard.push(newEntry);
    
    // Sort by score descending
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Keep only top 100 entries
    const trimmedLeaderboard = leaderboard.slice(0, 100);
    
    if (writeLeaderboard(trimmedLeaderboard)) {
      res.json({ success: true, entry: newEntry });
    } else {
      res.status(500).json({ error: 'Failed to save score' });
    }
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ error: 'Failed to submit score' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Leaderboard API server running on http://localhost:${PORT}`);
});

