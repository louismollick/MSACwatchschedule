import passport from 'passport';
import passportDiscord from 'passport-discord';
const DiscordStrategy = passportDiscord.Strategy;

export default () => {
  passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID!,
    clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    callbackURL: '/auth/redirect',
    scope: ['identify', 'guilds']
  }, (accessToken, refreshToken, profile, done) => {
    if (true || profile.guilds!.some(guild => guild.id === process.env.MSAC_GUILD_ID)) {
      done(null, profile);
    } else {
      done(null, false);
    }
  }));
}