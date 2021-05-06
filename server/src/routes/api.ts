import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/party', async (req, res) => {
  res.send('Hello!');
});
