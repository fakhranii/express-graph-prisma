import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Request } from 'express';
import User from '../entities/user.entity';

const google_callback_url = 'http://localhost:5000/api/v1/auth/google/callback';

// Define the type explicitly
type UserInstance = InstanceType<typeof User>;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: google_callback_url,
      passReqToCallback: true,
    },
    async (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: Express.User | false | undefined) => void
    ) => {
      console.log('The Profile Information', profile);

      const defaultUser = {
        fullname: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        googleId: profile.id,
        picture: profile.photos?.[0]?.value || '',
      };

      try {
        const [user, created] = await User.findOrCreate({
          where: { googleId: defaultUser.googleId },
          defaults: defaultUser,
        });

        return done(null, user);
      } catch (e) {
        console.error(e);
        return done(e, false);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user: any, done) => {
  done(null, user.id); // Use getDataValue to access 'id' field
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
