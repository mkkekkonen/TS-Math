import {
  Router,
} from 'express';

import { authApi } from '../services/api';
import { getPath } from '../services/util';
import { commonData } from '.';

const router = Router();

router.get('/login', (req, res) => res.render('auth/login', { ...commonData }));

router.post('/login', async (req, res) => {
  try {
    const apiResponse = await authApi.login(req.body.email, req.body.password);
    return res.set('Set-Cookie', `access_token=${apiResponse.data.token}; HttpOnly; Path=/; SameSite=Strict`).redirect(getPath('/'));
  } catch (e) {
    return res.status(400).render('auth/login', { flashMessage: e.response.data.message || e.message, ...commonData });
  }
});

export default router;
