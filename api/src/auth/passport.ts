import passport from 'passport';
import passportJwt, { ExtractJwt } from 'passport-jwt';
import passportLocal from 'passport-local';

import bcrypt from 'bcrypt';

import { userInterface } from '../dbInterface/interfaces';
import secrets from '../assets/json/secrets.json';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

export const init = () => {
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, callback) => {
      let user;
      try {
        user = await userInterface.findOne({ email });
      } catch (e) {
        return callback(e);
      }

      if (!user) {
        return callback(new Error('User not found!'));
      }

      try {
        await bcrypt.compare(password, user.passwordHash);
      } catch (e) {
        return callback(e);
      }

      return callback(null, user, { message: 'Logged in' });
    }),
  );

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secrets.secret,
      },
      async (jwtPayload, callback) => {
        let user;
        try {
          user = userInterface.getOne(jwtPayload.id);
        } catch (e) {
          return callback(e);
        }

        if (!user) {
          return callback(new Error('User not found!'));
        }

        return callback(null, user);
      },
    ),
  );
};
