import querystring from 'querystring';

import * as settings from './settings';

export const login = (email: string, password: string) => (
  settings.getInstance().post(
    '/auth/login',
    querystring.stringify({ email, password }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  ));

export const loggedIn = (accessToken: string) => settings.getInstance().get(
  '/auth/loggedin',
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  },
);
