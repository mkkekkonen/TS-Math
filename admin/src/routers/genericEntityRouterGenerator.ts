import {
  Router,
} from 'express';

import { GenericEntityApi } from '../services/api';

export class GenericEntityRouterGenerator<T> {
  api: GenericEntityApi<T>;
  router: Router;

  constructor(private baseUrl: string, private viewDirectoryName: string) {}

  initialize() {
    this.api = new GenericEntityApi<T>(this.baseUrl);

    this.router = Router();

    this.router.get('/', async (req, res) => {
      const entities = await this.api.getAll();
      res.render(`entities/${this.viewDirectoryName}/list`, { entities });
    });

    return this.router;
  }
}
