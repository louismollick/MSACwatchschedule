import passport from 'passport';
import passportDiscord from 'passport-discord';
import User from '../models/User';
import {UserDocument} from '../types/dbTypes';

const DiscordStrategy = passportDiscord.Strategy;

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID!,
  clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  callbackURL: `${process.env.API_URI}/auth/redirect`,
  scope: ['identify', 'guilds'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Reject if user is not in the MSAC server
    if (!profile.guilds!.some((guild) => guild.id === process.env.MSAC_GUILD_ID)) {
      return done(new Error('You must be a member of the MSAC discord server.'));
    }

    // Otherwise, query the Discord user from the database
    const {id, username, discriminator, avatar} = profile;
    const currUser: UserDocument | undefined = await User.get(id);
    const newUser: UserDocument = new User({
      id,
      username,
      discriminator,
      avatar,
      accessToken,
      refreshToken,
      tokenIssueDate: new Date(),
      // parties: new Set<PartyDocument>([...(currUser?.parties || [])]), // dbUser?.parties can be undefined
    });

    // Create user if they're not signed up. Otherwise update the existing one.
    if (!currUser) await User.create(newUser);
    else await User.update(newUser);

    // Then pass along in express' req.user
    return done(null, newUser);
  } catch (error) {
    console.error(error);
    return done(error);
  }
}));
