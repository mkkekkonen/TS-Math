import { getPath } from '../services/util';

import pages from '../assets/json/pages.json';

const basePath = () => {
  if (process.env.HEROKU) {
    return '';
  }

  return process.env.NODE_ENV === 'production' || process.env.PROXY_TEST ? '/math-admin' : '';
};

export const commonData = {
  navPages: pages,
  basePath: basePath(),
};
