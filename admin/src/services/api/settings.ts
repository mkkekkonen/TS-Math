import axios, { AxiosInstance } from 'axios';

let instance: AxiosInstance;

export const getApiBaseUrl = () => {
  if (process.env.PROXY_TEST) {
    return 'http://localhost/math-api';
  }

  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://www.mkkekkonen.com/math-api';
    case 'development':
    default:
      return process.env.MOBILE ? 'http://192.168.1.66:3100' : 'http://localhost:3100';
  }
};

export const getInstance = () => {
  if (!instance) {
    instance = axios.create({
      baseURL: getApiBaseUrl(),
    });
  }
  return instance;
};
