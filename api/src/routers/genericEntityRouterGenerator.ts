import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import passport from 'passport';
import { ValidationChain, body } from 'express-validator';

import { GenericDbInterface } from '../dbInterface';

const handleError = (e: Error, res: Response) => res.status(500).send(e.message);

const authMiddleware = passport.authenticate('jwt', { session: false });

interface ISortItem {
  id: number
  index: number
}

export class GenericEntityRouterGenerator<T> {
  private dbInterface: GenericDbInterface<T>;
  private validationRules: ValidationChain[];

  constructor(
    entityClass: any,
    validationRules: ValidationChain[],
  ) {
    this.dbInterface = new GenericDbInterface<T>(entityClass);
    this.validationRules = validationRules;
  }

  createRouter() {
    const router = Router();

    router.get('/', async (req, res, next) => {
      try {
        const entities = await this.dbInterface.getAll();
        return res.json(entities);
      } catch (e) {
        return handleError(e, res);
      }
    });

    router.get('/:id', async (req, res, next) => {
      try {
        const entity = await this.dbInterface.getOne(+req.params.id);
        if (!entity) {
          return res.status(404).send('Not found');
        }
        return res.json(entity);
      } catch (e) {
        return handleError(e, res);
      }
    });

    router.post('/',
      authMiddleware,
      this.validationRules,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const entity = await this.dbInterface.create(req.body);
          return res.json(entity);
        } catch (e) {
          return handleError(e, res);
        }
      });

    router.patch('/:id',
      authMiddleware,
      this.validationRules,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const entity = await this.dbInterface.update(+req.params.id, req.body);
          return res.json(entity);
        } catch (e) {
          return handleError(e, res);
        }
      });

    router.delete('/:id', authMiddleware, async (req, res, next) => {
      try {
        const id = +req.params.id;
        await this.dbInterface.delete(id);
        return res.json({ deletedId: id });
      } catch (e) {
        return handleError(e, res);
      }
    });

    router.post('/sort',
      authMiddleware,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const entities = req.body.map(
            (item: ISortItem) => this.dbInterface.update(item.id, item),
          );
          return res.json(await Promise.all(entities));
        } catch (e) {
          return handleError(e, res);
        }
      });

    return router;
  }
}
