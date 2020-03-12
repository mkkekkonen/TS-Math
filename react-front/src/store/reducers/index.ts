import { combineReducers } from 'redux';

import categories from './categories';
import subcategories from './subcategories';
import pages from './pages';

export default combineReducers({
  categories,
  subcategories,
  pages,
});
