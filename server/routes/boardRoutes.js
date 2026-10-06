const express = require('express');
const { getBoardState } = require('../utils/boardState');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const state = await getBoardState();
    res.json(state);
  } catch (err) {
    console.error('Error fetching board state:', err);
    res.status(500).json({ error: 'Failed to fetch board state' });
  }
});

module.exports = router;