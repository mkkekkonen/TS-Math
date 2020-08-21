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
        flashMessage: req.query.errmsg && decodeURIComponent(req.query.errmsg as string),
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

  renderEdit = async (req: Request, res: Response) => {
    const page = await this.api.getById(+req.params.id);
    const subcategories = await this.subcategoryApi.getAll();

    return res.render(
      this.createEditView,
      {
        page,
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

  edit = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const page = await this.api.getById(id);
    const subcategories = await this.subcategoryApi.getAll();

    const errorMessage = this.getError(req);

    if (errorMessage) {
      return res.render(
        this.createEditView,
        {
          page,
          subcategories,
          flashMessage: errorMessage,
          ...commonData,
        },
      );
    }

    try {
      const newPage = await this.api.edit(id, req.body, req.cookies.access_token);
    } catch (e) {
      return res.render(
        this.createEditView,
        {
          page,
          subcategories,
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
