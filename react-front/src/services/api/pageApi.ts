import * as settings from './settings';

export const getAllPages = async () => {
  const response = await settings.getInstance().get('/page/');
  return response.data;
};
