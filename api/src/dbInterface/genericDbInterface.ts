import {
  Repository,
  FindManyOptions,
  BaseEntity,
  createConnection,
  getConnection,
} from 'typeorm';

import {
  Page,
  Category,
  Subcategory,
  User,
} from '../entities';

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

const handleError = (e: any) => {
  console.error(`Error: ${e.message}`);
  return Promise.reject(e.message);
};

export const createConn = () => createConnection({
  type: 'sqlite',
  database: getDbPath(),
  entities: [
    Page,
    Category,
    Subcategory,
    User,
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
      return handleError(e);
    }
  }

  getOne = async (id: number, relations?: string[]) => {
    try {
      const repository = await this.getRepository();
      return repository.findOne(id, { relations });
    } catch (e) {
      return handleError(e);
    }
  }

  findOne = async (options: any, relations?: string[]) => {
    try {
      const repository = await this.getRepository();
      return repository.findOne(options, { relations });
    } catch (e) {
      return handleError(e);
    }
  }

  addOrUpdate = async (entity: any) => {
    try {
      const repository = await this.getRepository();
      return repository.save(entity);
    } catch (e) {
      return handleError(e);
    }
  }

  create = async (obj: any) => {
    try {
      const repository = await this.getRepository();
      const entity = repository.create(obj);
      return repository.save(entity);
    } catch (e) {
      return handleError(e);
    }
  }

  update = async (id: number, obj: any) => {
    try {
      const repository = await this.getRepository();
      const entity = await repository.findOne(id);
      if (entity) {
        repository.merge(entity, obj);
        return repository.save(entity);
      }
      throw new Error('Not found!');
    } catch (e) {
      return handleError(e);
    }
  }

  updateMulti = async (objs: any[]) => {
    try {
      const repository = await this.getRepository();
      return repository.save(objs);
    } catch (e) {
      return handleError(e);
    }
  }

  remove = async (entity: any) => {
    try {
      const repository = await this.getRepository();
      return repository.remove(entity);
    } catch (e) {
      return handleError(e);
    }
  }

  delete = async (id: number) => {
    try {
      const repository = await this.getRepository();
      return repository.delete(id);
    } catch (e) {
      return handleError(e);
    }
  }

  nuke = async () => {
    try {
      const repository = await this.getRepository();
      return repository.clear();
    } catch (e) {
      return handleError(e);
    }
  }
}
