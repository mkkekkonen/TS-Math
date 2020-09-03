import {
  CategoryRouterGenerator,
  SubcategoryRouterGenerator,
  PageRouterGenerator,
} from './entities';

export const categoryRouter = (new CategoryRouterGenerator()).initialize();
export const subcategoryRouter = (new SubcategoryRouterGenerator()).initialize();
export const pageRouter = (new PageRouterGenerator()).initialize();
