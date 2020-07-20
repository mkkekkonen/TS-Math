import {
  Router,
} from 'express';

import { GenericEntityApi } from '../services/api';

import { commonData } from '.';

export class GenericEntityRouterGenerator<T> {
  api: GenericEntityApi<T>;
  router: Router;

  constructor(private apiBaseUrl: string, private viewDirectoryName: string) {}

  initialize() {
    this.api = new GenericEntityApi<T>(this.apiBaseUrl);

    this.router = Router();

    this.router.get('/', async (req, res) => {
      const entities = await this.api.getAll();
      res.render(`entities/${this.viewDirectoryName}/list`, { entities, ...commonData });
    });

    return this.router;
  }
}
