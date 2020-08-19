import querystring from 'querystring';

import * as settings from './settings';

export class GenericEntityApi<T> {
  constructor(private baseUrl: string) {}

  getAll = async () => {
    const response = await settings.getInstance().get(this.baseUrl);
    return response.data as T[];
  }

  getById = async (id: number) => {
    const response = await settings.getInstance().get(`${this.baseUrl}${id}`);
    return response.data as T;
  }

  create = async (data: any, accessToken: string) => {
    const response = await settings.getInstance().post(
      this.baseUrl,
      querystring.stringify(data),
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data as T;
  }

  edit = async (id: number, data: any, accessToken: string) => {
    const response = await settings.getInstance().patch(
      `${this.baseUrl}${id}`,
      querystring.stringify(data),
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    return response.data as T;
  }
}
