import querystring from 'querystring';

import * as settings from './settings';

const getAuthorizationHeader = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

const contentTypeHeader = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

interface ISortItem {
  id: number
  index: number
}

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
          ...getAuthorizationHeader(accessToken),
          ...contentTypeHeader,
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
          ...getAuthorizationHeader(accessToken),
          ...contentTypeHeader,
        },
      },
    );
    return response.data as T;
  }

  delete = async (id: number, accessToken: string) => {
    const response = await settings.getInstance().delete(
      `${this.baseUrl}${id}`,
      {
        headers: getAuthorizationHeader(accessToken),
      },
    );
  }

  sort = async (data: ISortItem[][], accessToken: string) => {
    const response = await settings.getInstance().post(
      `${this.baseUrl}sort`,
      data,
      {
        headers: {
          ...getAuthorizationHeader(accessToken),
        },
      },
    );
  }
}
