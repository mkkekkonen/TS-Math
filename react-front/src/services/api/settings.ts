import axios, { AxiosInstance } from 'axios';

let instance: AxiosInstance;

export const getBaseUrl = () => {
  if (process.env.HEROKU) {
    return 'https://intense-beyond-45045.herokuapp.com';
  }

  switch (process.env.NODE_ENV) {
    case 'development':
      return process.env.MOBILE ? 'http://192.168.1.66:3100' : 'http://localhost:3100';
    case 'production':
      return 'https://www.mkkekkonen.fi/math-api'
  }
}

export const getInstance = () => {
  if (!instance) {
    instance = axios.create({
      baseURL: getBaseUrl(),
    });
  }
  return instance;
}
