import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import bcrypt from 'bcrypt';

import secrets from '../assets/json/secrets.json';
import { userInterface } from '../dbInterface/interfaces';
import { User } from '../entities';

const router = Router();

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

      req.login(user, { session: false }, loginErr => {
        if (loginErr) {
          res.send(loginErr);
        }

        const token = jwt.sign(user, secrets.secret);

        return res.json({ user, token });
      });

      return res.status(500).send('Shouldn\'t come here');
    });

    middleware(req, res, next);
  },
  (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).send(err.message)
  });

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

export default router;
