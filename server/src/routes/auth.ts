import express from 'express';
import passport from 'passport';
import fs from 'fs';
import path from 'path';
import jsonwebtoken from 'jsonwebtoken';
import {MSACUser, UserDocument} from '../types/dbTypes';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/start', passport.authenticate('discord', {session: false, scope: ['identify', 'guilds']}));
router.get('/redirect', passport.authenticate('discord', {session: false}), async (req, res) => {
  // Discord authentication failed, so send error message.
  if (!req.user) return res.status(403).send('Error: You must be a member of the MSAC discord server.');

  // Discord authentication success, now we need to return a token + user data
  // We can type assert here because we know that request.user was the user we passed in 'discordStrategy.ts'
  // then remove sentitive information from User object that we don't want to pass to client
  const {id, username, discriminator, avatar} = req.user! as UserDocument;
  const user: MSACUser = {id, username, discriminator, avatar};
  return res.json({
    ...issueJWT(user.id),
    user,
  });
});

// Creates new token using private key from 'keys' directory
const PRIV_KEY = fs.readFileSync(path.join(__dirname, '../../src/keys/id_rsa_priv.pem'), 'utf8');
const issueJWT = (uid: string) => {
  const expiresIn = '1d';
  const payload = {
    sub: uid,
    iat: Date.now(),
  };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256'});
  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
};

export default router;
