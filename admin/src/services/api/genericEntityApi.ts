import * as settings from './settings';

export class GenericEntityApi<T> {
  constructor(private baseUrl: string) {}

  getAll = async () => {
    const response = await settings.getInstance().get(this.baseUrl);
    return response.data as T[];
  }
}
