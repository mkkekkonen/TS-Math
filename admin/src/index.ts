import express, { Request, Response, NextFunction } from 'express';
import expressHandlebars from 'express-handlebars';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { authRouter, entityRouters, commonData } from './routers';
import { authApi } from './services/api';
import { getPath } from './services/util';
import helpers from './helpers';

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userResponse = await authApi.loggedIn(req.cookies.access_token);
    if (userResponse.data.user.admin) {
      return next();
    }
  } catch (e) {
    return res.redirect(getPath('/auth/login'));
  }

  return res.send('Forbidden');
};

const run = async () => {
  const app = express();

  const handlebars = expressHandlebars.create({ helpers });

  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(express.static('src/assets'));
  app.use(express.static('src/content'));

  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');
  app.set('views', 'src/views');

  app.get('/', async (req, res) => {
    try {
      await authApi.loggedIn(req.cookies.access_token);
    } catch (e) {
      return res.redirect(getPath('/auth/login'));
    }
    return res.render('home', { ...commonData });
  });

  app.use('/auth', authRouter);

  app.use('/categories', adminMiddleware, entityRouters.categoryRouter);
  app.use('/subcategories', adminMiddleware, entityRouters.subcategoryRouter);
  app.use('/pages', adminMiddleware, entityRouters.pageRouter);

  app.use((req, res) => {
    res.render('notFound');
  });

  const port = process.env.PORT || 3001;
  console.log(`Debugger listening at port ${port}`);
  app.listen(port);
};

run();
