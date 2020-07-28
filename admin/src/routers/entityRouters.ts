import {
  CategoryRouterGenerator,
  SubcategoryRouterGenerator,
} from './entities';
import {
  ICategory,
  ISubcategory,
  IPage,
} from '../entities';

export const categoryRouter = (new CategoryRouterGenerator()).initialize();
export const subcategoryRouter = (new SubcategoryRouterGenerator()).initialize();
// export const pageRouter = (new GenericEntityRouterGenerator<IPage>('/page/', 'pages')).initialize();
