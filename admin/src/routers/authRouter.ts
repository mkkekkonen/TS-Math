import {
  Router,
} from 'express';

import { authApi } from '../services/api';

const router = Router();

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', async (req, res) => {
  try {
    const apiResponse = await authApi.login(req.body.email, req.body.password);
    return res.set('Set-Cookie', `access_token=${apiResponse.data.token}; HttpOnly; Path=/; SameSite=Strict`).redirect('/');
  } catch (e) {
    return res.status(400).render('auth/login', { flashMessage: e.response.data.message || e.message });
  }
});

export default router;
