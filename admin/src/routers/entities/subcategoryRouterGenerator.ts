import { Request, Response } from 'express';
import { body } from 'express-validator';

import { BaseEntityRouterGenerator } from './baseEntityRouterGenerator';

import { commonData } from '../data';

import { ICategory, ISubcategory } from '../../entities';
import { GenericEntityApi } from '../../services/api';

export class SubcategoryRouterGenerator extends BaseEntityRouterGenerator<ISubcategory> {
  categoryApi: GenericEntityApi<ICategory>;

  constructor() {
    super(
      '/subcategory/',
      'subcategories',
      [
        body('name').isString(),
        body('categoryId').isInt(),
      ],
    );

    this.categoryApi = new GenericEntityApi<ICategory>('/category/');
  }

  renderList = async (req: Request, res: Response) => {
    const categories = await this.categoryApi.getAll();
    const subcategories = await this.api.getAll();

    return res.render(
      this.listView,
      {
        categories,
        subcategories,
        ...commonData,
      },
    );
  }

  renderCreate = async (req: Request, res: Response) => {
    const categories = await this.categoryApi.getAll();

    return res.render(
      this.createEditView,
      {
        categories,
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
      const categories = await this.categoryApi.getAll();

      return res.render(
        this.createEditView,
        {
          flashMessage: e.message,
          categories,
          ...commonData,
        },
      );
    }

    return res.redirect(`/${this.viewDirectoryName}`);
  }
}
