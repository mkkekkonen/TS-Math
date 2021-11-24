import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import * as auth from '../auth';
import { loginRouter, entityRouters } from '../routers';
import { getConn } from '../dbInterface';

const allowedOrigins = [
  'http://localhost:5000', // Heroku local
  'http://localhost:8000',
  'http://192.168.1.66:8000',
  'https://floating-shelf-57592.herokuapp.com',
  'http://math.mkkekkonen.fi',
];

const initApp = async () => {
  const dbConnection = await getConn();
  await dbConnection.synchronize();

  auth.init();

  const app = express();

  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use((req, res, next) => {
    if (allowedOrigins.includes(req.get('origin')!)) {
      res.header('Access-Control-Allow-Origin', req.get('origin'));
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }
    next();
  });

  app.use('/auth', loginRouter);

  app.use('/category', entityRouters.categoryRouter);
  app.use('/subcategory', entityRouters.subcategoryRouter);
  app.use('/page', entityRouters.pageRouter);

  app.use((req, res, next) => {
    const err: any = new Error('Not found');
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = err;

    res.status(err.status || 500).send(err.message);
  });

  app.listen(process.env.PORT || 3100);

  console.log('Listening in port 3100...');

  return app;
};

export { initApp };
