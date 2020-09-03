import { Router, Response } from 'express';
import passport from 'passport';

import { GenericDbInterface } from '../dbInterface';

const handleError = (e: Error, res: Response) => res.status(500).send(e.message);

const authMiddleware = passport.authenticate('jwt', { session: false });

export class GenericEntityRouterGenerator<T> {
  private dbInterface: GenericDbInterface<T>;

  constructor(entityClass: any) {
    this.dbInterface = new GenericDbInterface<T>(entityClass);
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

    router.post('/', authMiddleware, async (req, res, next) => {
      try {
        const entity = await this.dbInterface.create(req.body);
        return res.json(entity);
      } catch (e) {
        return handleError(e, res);
      }
    });

    router.patch('/:id', authMiddleware, async (req, res, next) => {
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

    return router;
  }
}
