import express from 'express';
import expressHandlebars from 'express-handlebars';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { authRouter, entityRouters, commonData } from './routers';
import { authApi } from './services/api';

const run = async () => {
  const app = express();

  const handlebars = expressHandlebars.create();

  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
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
      return res.redirect('/auth/login');
    }
    return res.render('home', { ...commonData });
  });

  app.use('/auth', authRouter);

  app.use(async (req, res, next) => {
    try {
      await authApi.loggedIn(req.cookies.access_token);
    } catch (e) {
      return res.redirect('/auth/login');
    }
    return next();
  });

  app.use('/categories', entityRouters.categoryRouter);
  app.use('/subcategories', entityRouters.subcategoryRouter);
  app.use('/pages', entityRouters.pageRouter);

  app.use((req, res) => {
    res.render('notFound');
  });

  const port = process.env.PORT || 3001;
  console.log(`Debugger listening at port ${port}`);
  app.listen(port);
};

run();
