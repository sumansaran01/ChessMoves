const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getValidMoves } = require('./chessLogic');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/chess/:slug', (req, res) => {
  const { slug } = req.params;
  const { postions } = req.body;
  if (!postions || typeof postions !== 'object') {
    return res.status(400).json({ error: 'Invalid input: postions is required and must be an object.' });
  }
  try {
    const validMoves = getValidMoves(slug, postions);
    res.json({ valid_moves: validMoves });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 