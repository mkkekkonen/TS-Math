import * as settings from './settings';

export const getAllSubcategories = async () => {
  const response = await settings.getInstance().get('/subcategory/');
  return response.data;
};
