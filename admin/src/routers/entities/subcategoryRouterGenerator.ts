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
        flashMessage: req.query.errmsg && decodeURIComponent(req.query.errmsg as string),
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

  renderEdit = async (req: Request, res: Response) => {
    let subcategory;
    try {
      subcategory = await this.api.getById(+req.params.id);
    } catch (e) {
      return res.render('notFound', { ...commonData });
    }

    const categories = await this.categoryApi.getAll();

    return res.render(
      this.createEditView,
      {
        subcategory,
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

  edit = async (req: Request, res: Response) => {
    const id = +req.params.id;

    let subcategory;
    try {
      subcategory = await this.api.getById(id);
    } catch (e) {
      return res.render('notFound', { ...commonData });
    }

    const categories = await this.categoryApi.getAll();

    const errorMessage = this.getError(req);

    if (errorMessage) {
      return res.render(
        this.createEditView,
        {
          subcategory,
          categories,
          flashMessage: errorMessage,
          ...commonData,
        },
      );
    }

    try {
      const newSubcategory = await this.api.edit(id, req.body, req.cookies.access_token);
    } catch (e) {
      return res.render(
        this.createEditView,
        {
          subcategory,
          categories,
          flashMessage: e.message,
          ...commonData,
        },
      );
    }

    return res.redirect(`/${this.viewDirectoryName}`);
  }

  delete = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const errorMessage = this.getError(req);

    if (errorMessage) {
      const encodedMessage = encodeURIComponent(errorMessage);
      return res.redirect(`/${this.viewDirectoryName}?errmsg=${encodedMessage}`);
    }

    try {
      await this.api.delete(id, req.cookies.access_token);
    } catch (e) {
      const encodedMessage = encodeURIComponent(e.message);
      return res.redirect(`/${this.viewDirectoryName}?errmsg=${encodedMessage}`);
    }

    return res.redirect(`/${this.viewDirectoryName}`);
  }
}
