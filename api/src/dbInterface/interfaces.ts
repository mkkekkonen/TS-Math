import {
  Page,
  Category,
  Subcategory,
  User,
} from '../entities';
import { GenericDbInterface } from '.';

export const pageInterface = new GenericDbInterface<Page>(Page);
export const categoryInterface = new GenericDbInterface<Category>(Category);
export const subcategoryInterface = new GenericDbInterface<Subcategory>(Subcategory);
export const userInterface = new GenericDbInterface<User>(User);
