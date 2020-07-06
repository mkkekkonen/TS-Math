import { GenericEntityRouterGenerator } from './genericEntityRouterGenerator';
import {
  ICategory,
  ISubcategory,
  IPage,
} from '../entities';

export const categoryRouter = (new GenericEntityRouterGenerator<ICategory>('/category/', 'categories')).initialize();
export const subcategoryRouter = (new GenericEntityRouterGenerator<ISubcategory>('/subcategory/', 'subcategories')).initialize();
export const pageRouter = (new GenericEntityRouterGenerator<IPage>('/page/', 'pages')).initialize();
