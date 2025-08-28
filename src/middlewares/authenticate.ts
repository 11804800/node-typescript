import passport from "passport";
import User from "../model/User";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey: string | undefined = process.env.SECRET_KEY;
if (!secretKey) {
  throw new Error('SECRET_KEY environment variable is not set');
}

passport.use(new LocalStrategy(User.authenticate()));

export const local = passport;

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export const getToken = (user: object): string => {
  return jwt.sign(user, secretKey, { expiresIn: '3600' });
};

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

interface MyJwtPayload extends JwtPayload {
  _id: string;
}

passport.use(
  new JwtStrategy(opts, (jwt_payload: MyJwtPayload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err:any, user:any) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

export const verifyUser = passport.authenticate('jwt', { session: false });