import { Repository, FindManyOptions, createConnection, getConnection } from 'typeorm';
import { Page, Category, Subcategory } from '../entities';

const getDbPath = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'db.sqlite';
    case 'test':
      return 'test.sqlite';
    case 'development':
    default:
      return 'dev.sqlite';
  }
};

export const createConn = () => createConnection({
  type: 'sqlite',
  database: getDbPath(),
  entities: [
    Page,
    Category,
    Subcategory,
  ],
});

export const getConn = async () => {
  try {
    return getConnection();
  } catch (e) {
    return createConn();
  }
};

export class GenericDbInterface<T> {
  constructor(private entityClass: any) {}

  private getRepository = async () => {
    const connection = await getConn();
    const { entityClass } = this;
    return connection.getRepository(this.entityClass) as Repository<T>;
  }

  getAll = async (options?: FindManyOptions<T>) => {
    try {
      const repository = await this.getRepository();
      return repository.find(options);
    } catch (e) {
      console.error(`Error: ${e.message}`);
      return Promise.reject(e.message);
    }
  }

  getOne = async (id: number, relations?: string[]) => {
    try {
      const repository = await this.getRepository();
      return repository.findOne(id, { relations });
    } catch (e) {
      console.error(`Error: ${e.message}`);
      return Promise.reject(e.message);
    }
  }

  addOrUpdate = async (entity: any) => {
    try {
      const repository = await this.getRepository();
      return repository.save(entity);
    } catch (e) {
      console.error(`Error: ${e.message}`);
      return Promise.reject(e.message);
    }
  }

  remove = async (entity: any) => {
    try {
      const repository = await this.getRepository();
      return repository.remove(entity);
    } catch (e) {
      console.error(`Error: ${e.message}`);
      return Promise.reject(e.message);
    }
  }

  delete = async (id: number) => {
    try {
      const repository = await this.getRepository();
      return repository.delete(id);
    } catch (e) {
      console.error(`Error: ${e.message}`);
      return Promise.reject(e.message);
    }
  }

  nuke = async () => {
    try {
      const repository = await this.getRepository();
      return repository.clear();
    } catch (e) {
      console.error(`Error: ${e.message}`);
      return Promise.reject(e.message);
    }
  }
}
