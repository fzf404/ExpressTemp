const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ name: 'fzf', website: 'https://fzf404.top' });
});

router.post('/new', (req, res) => {
  res.status(201).json({ msg: '233' });
});

module.exports = router;