import { Repository, createConnection, getConnection } from 'typeorm';
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

export class GenericDbInterface {
  constructor(private entityClass: any) {}

  private getRepository = async () => {
    const connection = await getConn();
    const { entityClass } = this;
    return connection.getRepository(this.entityClass) as Repository<typeof entityClass>;
  }

  getAll = async (relations?: string[]) => {
    try {
      const repository = await this.getRepository();
      return repository.find({ relations });
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  getOne = async (id: number, relations?: string[]) => {
    try {
      const repository = await this.getRepository();
      return repository.findOne(id, { relations });
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  addOrUpdate = async (entity: any) => {
    try {
      const repository = await this.getRepository();
      return repository.save(entity);
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  remove = async (entity: any) => {
    try {
      const repository = await this.getRepository();
      return repository.remove(entity);
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  delete = async (id: number) => {
    try {
      const repository = await this.getRepository();
      return repository.delete(id);
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  nuke = async () => {
    try {
      const repository = await this.getRepository();
      return repository.clear();
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }
}
