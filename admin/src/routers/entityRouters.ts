import { GenericEntityRouterGenerator } from './genericEntityRouterGenerator';
import {
  ICategory,
} from '../entities';

export const categoryRouter = (new GenericEntityRouterGenerator<ICategory>('/category/', 'categories')).initialize();
