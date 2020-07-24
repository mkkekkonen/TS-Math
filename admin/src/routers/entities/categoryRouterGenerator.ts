import { Request, Response } from 'express';
import { body } from 'express-validator';

import { BaseEntityRouterGenerator } from './baseEntityRouterGenerator';

import { commonData } from '../data';

import { ICategory } from '../../entities';

export class CategoryRouterGenerator extends BaseEntityRouterGenerator<ICategory> {
  constructor() {
    super(
      '/category/',
      'categories',
      [body('name').isString()],
    );
  }

  renderList = async (req: Request, res: Response) => {
    const categories = await this.api.getAll();
    return res.render(
      this.listView,
      {
        categories,
        pathBase: this.viewDirectoryName,
        ...commonData,
      },
    );
  }

  renderCreate = async (req: Request, res: Response) => (
    res.render(this.createEditView, { ...commonData })
  )

  createNew = async (req: Request, res: Response) => {
    const errorMessage = this.getError(req);

    if (errorMessage) {
      return res.render(this.createEditView, { flashMessage: errorMessage });
    }

    try {
      const entity = await this.api.create(req.body, req.cookies.access_token);
    } catch (e) {
      return res.render(
        this.createEditView,
        { flashMessage: e.message, ...commonData },
      );
    }

    return res.redirect(`/${this.viewDirectoryName}`);
  }
}
