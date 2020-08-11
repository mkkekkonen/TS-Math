import { Request, Response } from 'express';
import { body } from 'express-validator';

import { BaseEntityRouterGenerator } from './baseEntityRouterGenerator';

import { commonData } from '../data';

import { ISubcategory, IPage } from '../../entities';
import { GenericEntityApi } from '../../services/api';

export class PageRouterGenerator extends BaseEntityRouterGenerator<IPage> {
  subcategoryApi: GenericEntityApi<ISubcategory>;

  constructor() {
    super(
      '/page/',
      'pages',
      [
        body('name').isString(),
        body('urlTitle').isString(),
        body('subcategoryId').isInt(),
      ],
    );

    this.subcategoryApi = new GenericEntityApi<ISubcategory>('/subcategory/');
  }

  renderList = async (req: Request, res: Response) => {
    const subcategories = await this.subcategoryApi.getAll();
    const pages = await this.api.getAll();

    return res.render(
      this.listView,
      {
        pages,
        subcategories,
        ...commonData,
      },
    );
  }

  renderCreate = async (req: Request, res: Response) => {
    const subcategories = await this.subcategoryApi.getAll();

    return res.render(
      this.createEditView,
      {
        subcategories,
        ...commonData,
      },
    );
  }

  createNew = async (req: Request, res: Response) => {
    const errorMessage = this.getError(req);

    if (errorMessage) {
      return res.render(this.createEditView, { flashMessage: errorMessage });
    }

    try {
      const entity = await this.api.create(req.body, req.cookies.access_token);
    } catch (e) {
      const subcategories = await this.subcategoryApi.getAll();

      return res.render(
        this.createEditView,
        {
          flashMessage: e.message,
          subcategories,
          ...commonData,
        },
      );
    }

    return res.redirect(`/${this.viewDirectoryName}`);
  }
}
