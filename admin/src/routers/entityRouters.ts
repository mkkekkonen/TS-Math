import { CategoryRouterGenerator } from './entities';
import {
  ICategory,
  ISubcategory,
  IPage,
} from '../entities';

export const categoryRouter = (new CategoryRouterGenerator()).initialize();
// export const subcategoryRouter = (new GenericEntityRouterGenerator<ISubcategory>('/subcategory/', 'subcategories')).initialize();
// export const pageRouter = (new GenericEntityRouterGenerator<IPage>('/page/', 'pages')).initialize();
