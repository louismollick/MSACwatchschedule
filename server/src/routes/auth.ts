import express from 'express';
import passport from 'passport';
import fs from 'fs';
import jsonwebtoken from 'jsonwebtoken';
import { Profile } from 'passport-discord';

const PRIV_KEY = fs.readFileSync('src/keys/id_rsa_priv.pem', 'utf8');
const router = express.Router();

const issueJWT = (uid: string) => {
  const expiresIn = '1d';
  const payload = {
    sub: uid,
    iat: Date.now()
  };
  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

router.get('/start', passport.authenticate('discord', { session: false, scope: ['identify', 'guilds'] }));
router.get('/redirect', passport.authenticate('discord', { session: false }), (req, res) => {
  return res.json({
    token: issueJWT((<Profile>req.user!).id!)
  })
});

export default router;