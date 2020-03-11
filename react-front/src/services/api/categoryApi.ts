import axios from 'axios';

import * as settings from './settings';

export const getAllCategories = async () => {
  const response = await settings.getInstance().get('/category/');
  console.dir(response.data);
};
