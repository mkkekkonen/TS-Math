import { body } from 'express-validator';

import { GenericEntityRouterGenerator } from './genericEntityRouterGenerator';
import {
  Category,
  Subcategory,
  Page,
} from '../entities';

const categoryValidationRules = [
  body('name').isString(),
];

const subcategoryValidationRules = [
  body('name').isString(),
  body('categoryId').isInt(),
];

const pageValidationRules = [
  body('name').isString(),
  body('urlTitle').isString(),
  body('subcategoryId').isInt(),
];

export const categoryRouter = (new GenericEntityRouterGenerator<Category>(
  Category,
  categoryValidationRules,
)).createRouter();

export const subcategoryRouter = (new GenericEntityRouterGenerator<Subcategory>(
  Subcategory,
  subcategoryValidationRules,
)).createRouter();

export const pageRouter = (new GenericEntityRouterGenerator<Page>(
  Page,
  pageValidationRules,
)).createRouter();
