const basePath = () => {
  if (process.env.HEROKU) {
    return '';
  }

  return process.env.NODE_ENV === 'production' || process.env.PROXY_TEST ? '/math-admin' : '';
};

export const getPath = (path: string) => (path ? (basePath() + path) : basePath());
