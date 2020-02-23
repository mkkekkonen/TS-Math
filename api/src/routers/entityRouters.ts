import { GenericEntityRouterGenerator } from './genericEntityRouterGenerator';
import {
  Category,
  Subcategory,
  Page,
} from '../entities';

export const categoryRouter = (new GenericEntityRouterGenerator<Category>(Category)).createRouter();
export const subcategoryRouter = (new GenericEntityRouterGenerator<Subcategory>(Subcategory))
  .createRouter();
export const pageRouter = (new GenericEntityRouterGenerator<Page>(Page)).createRouter();
