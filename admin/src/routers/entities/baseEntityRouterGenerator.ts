import {
  Router,
  Request,
  Response,
} from 'express';
import {
  ValidationChain,
  validationResult,
} from 'express-validator';

import { commonData } from '../data';

import { GenericEntityApi } from '../../services/api';

export abstract class BaseEntityRouterGenerator<T> {
  api: GenericEntityApi<T>;
  router: Router;

  constructor(
    private apiBaseUrl: string,
    protected viewDirectoryName: string,
    private validationRules: ValidationChain[] = [],
  ) {
  }

  initialize = () => {
    this.api = new GenericEntityApi<T>(this.apiBaseUrl);

    this.router = Router();

    this.router.get('/', this.renderList);

    this.router.get('/create', this.renderCreate);

    this.router.post('/create', this.validationRules, this.createNew);

    return this.router;
  };

  getError = (req: Request) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const [firstError] = errors.array();
      return `${firstError.param}: ${firstError.msg}`;
    }

    return null;
  }

  abstract renderList(req: Request, res: Response): Promise<void>;

  abstract renderCreate(req: Request, res: Response): Promise<void>;

  abstract createNew(req: Request, res: Response): Promise<void>;

  get listView() {
    return `entities/${this.viewDirectoryName}/list`;
  }

  get createEditView() {
    return `entities/${this.viewDirectoryName}/createEdit`;
  }
}
