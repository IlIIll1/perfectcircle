// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let leaderboard = [];

// Load leaderboard data from a JSON file if it exists
if (fs.existsSync('leaderboard.json')) {
    const data = fs.readFileSync('leaderboard.json', 'utf-8');
    leaderboard = JSON.parse(data);
}

// Endpoint to add a new score
app.post('/add-score', (req, res) => {
    const { name, score } = req.body;
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // Keep only the top 10 scores
    fs.writeFileSync('leaderboard.json', JSON.stringify(leaderboard, null, 2));
    res.sendStatus(200);
});

// Endpoint to get the top scores
app.get('/top-scores', (req, res) => {
    res.json(leaderboard);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
