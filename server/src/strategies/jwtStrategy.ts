import passport from 'passport';
import passportJwt from 'passport-jwt';
import fs from 'fs';
import path from 'path';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const PUB_KEY = fs.readFileSync(path.join(__dirname, '../../src/keys/id_rsa_pub.pem'), 'utf8');
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  done(null, true);
}));
