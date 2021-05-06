import express from 'express';
// import axios from 'axios';
// import passport from 'passport';
// import Party from '../models/Party';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Hello!');
});

export default router;
