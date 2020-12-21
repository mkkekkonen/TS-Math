import { Request, Response } from 'express';
import { body } from 'express-validator';

import { sortBy } from 'lodash';

import { BaseEntityRouterGenerator } from './baseEntityRouterGenerator';

import { commonData } from '../data';

import { getPath } from '../../services/util';

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
        categories: sortBy(categories, ['index']),
        flashMessage: req.query.errmsg && decodeURIComponent(req.query.errmsg as string),
        ...commonData,
      },
    );
  }

  renderCreate = async (req: Request, res: Response) => (
    res.render(this.createEditView, { ...commonData })
  )

  renderEdit = async (req: Request, res: Response) => {
    try {
      const category = await this.api.getById(+req.params.id);
      return res.render(this.createEditView, { category, ...commonData });
    } catch (e) {
      return res.render('notFound', { ...commonData });
    }
  }

  renderSort = async (req: Request, res: Response) => {
    const categories = await this.api.getAll();

    return res.render(
      this.sortView,
      {
        categories: sortBy(categories, ['index']),
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
      const category = await this.api.create(req.body, req.cookies.access_token);
    } catch (e) {
      return res.render(
        this.createEditView,
        { flashMessage: e.message, ...commonData },
      );
    }

    return res.redirect(getPath(`/${this.viewDirectoryName}`));
  }

  edit = async (req: Request, res: Response) => {
    const id = +req.params.id;
    let category;

    try {
      category = await this.api.getById(id);
    } catch (e) {
      return res.render('notFound', { ...commonData });
    }

    const errorMessage = this.getError(req);

    if (errorMessage) {
      return res.render(
        this.createEditView,
        {
          category,
          flashMessage: errorMessage,
          ...commonData,
        },
      );
    }

    try {
      const newCategory = await this.api.edit(id, req.body, req.cookies.access_token);
    } catch (e) {
      return res.render(
        this.createEditView,
        {
          id,
          category,
          flashMessage: e.message,
          ...commonData,
        },
      );
    }

    return res.redirect(getPath(`/${this.viewDirectoryName}`));
  }

  delete = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const errorMessage = this.getError(req);

    if (errorMessage) {
      const encodedMessage = encodeURIComponent(errorMessage);
      return res.redirect(getPath(`/${this.viewDirectoryName}?errmsg=${encodedMessage}`));
    }

    try {
      await this.api.delete(id, req.cookies.access_token);
    } catch (e) {
      const encodedMessage = encodeURIComponent(e.message);
      return res.redirect(getPath(`/${this.viewDirectoryName}?errmsg=${encodedMessage}`));
    }

    return res.redirect(getPath(`/${this.viewDirectoryName}`));
  }

  sort = async (req: Request, res: Response) => {
    const errorMessage = this.getError(req);

    if (errorMessage) {
      return res.status(400).send(errorMessage);
    }

    try {
      await this.api.sort(req.body, req.cookies.access_token);
    } catch (e) {
      return res.status(400).send(e.message);
    }

    return res.status(200).send('OK');
  }
}
