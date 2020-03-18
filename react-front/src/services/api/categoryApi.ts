import * as settings from './settings';

export const getAllCategories = async () => {
  const response = await settings.getInstance().get('/category/');
  return response.data;
};
