import { body } from 'express-validator';

export default {
  categories: [
    body('name').isString(),
  ],
  subcategories: [],
  pages: [],
};
