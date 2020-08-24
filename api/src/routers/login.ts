import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcrypt';

import secrets from '../assets/json/secrets.json';
import { userInterface } from '../dbInterface/interfaces';
import { User } from '../entities';

const router = Router();

const authMiddleware = passport.authenticate('jwt', { session: false });

router.post('/login',
  (req: Request, res: Response, next: NextFunction) => {
    const middleware = passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed',
          user,
        });
      }

      return req.login(user, { session: false }, loginErr => {
        if (loginErr) {
          return res.status(loginErr.status || 500).send(loginErr.message);
        }

        const token = jwt.sign(user, secrets.secret);

        return res.json({ user, token });
      });
    });

    return middleware(req, res, next);
  },
  (err: any, req: Request, res: Response, next: NextFunction) => (
    res.status(err.status || 500).send(err.message)
  ));

router.post('/register', async (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User();
      user.email = email;
      user.passwordHash = passwordHash;
      await userInterface.addOrUpdate(user);
      res.send('User created');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
});

router.get('/loggedin', authMiddleware, async (req, res, next) => {
  const user = await req.user;
  return res.status(200).json({ user });
});

export default router;
