import {
  Router,
} from 'express';

const router = Router();

router.get('/login', (req, res) => {
  return res.render('auth/login');
});

export default router;
