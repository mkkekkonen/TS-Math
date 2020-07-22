import {
  Router,
  Request,
  Response,
} from 'express';
import { validationResult } from 'express-validator';

import { GenericEntityApi } from '../services/api';

import { commonData } from '.';
import validationRules from './validationRules';

type ViewDirectoryName = 'categories' | 'subcategories' | 'pages';

export class GenericEntityRouterGenerator<T> {
  api: GenericEntityApi<T>;
  router: Router;

  constructor(private apiBaseUrl: string, private viewDirectoryName: ViewDirectoryName) {}

  initialize() {
    this.api = new GenericEntityApi<T>(this.apiBaseUrl);

    this.router = Router();

    this.router.get('/', async (req, res) => {
      const entities = await this.api.getAll();
      return res.render(
        `entities/${this.viewDirectoryName}/list`,
        { entities, pathBase: this.viewDirectoryName, ...commonData },
      );
    });

    this.router.get('/create', async (req, res) => (
      res.render(`entities/${this.viewDirectoryName}/createEdit`, { ...commonData })
    ));

    this.router.post('/create', validationRules[this.viewDirectoryName], async (req: Request, res: Response) => {
      const errors = validationResult(req);
      const createEditPath = `entities/${this.viewDirectoryName}/createEdit`;

      if (!errors.isEmpty()) {
        const [firstError] = errors.array();
        return res.render(
          createEditPath,
          { flashMessage: `${firstError.param}: ${firstError.msg}`, ...commonData },
        );
      }

      try {
        const entity = await this.api.create(req.body, req.cookies.access_token);
      } catch (e) {
        return res.render(
          createEditPath,
          { flashMessage: e.message, ...commonData },
        );
      }

      return res.redirect(`/${this.viewDirectoryName}`);
    });

    return this.router;
  }
}
