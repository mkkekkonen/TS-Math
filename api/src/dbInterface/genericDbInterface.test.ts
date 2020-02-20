import { Page, Category, Subcategory } from '../entities';
import { getConn } from '.';
import { pageInterface, categoryInterface, subcategoryInterface } from './interfaces';

const clearDb = async () => {
  try {
    await pageInterface.nuke();
    await categoryInterface.nuke();
    await subcategoryInterface.nuke();
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

const initEntities = async () => {
  try {
    const category = new Category();
    category.name = 'Testikategoria';
    await categoryInterface.addOrUpdate(category);

    const subcategory = new Subcategory();
    subcategory.name = 'Alakategoria';
    subcategory.category = category;
    await subcategoryInterface.addOrUpdate(subcategory);

    const page = new Page();
    page.name = 'Testisivu';
    page.urlTitle = 'qwerty';
    page.subcategory = subcategory;
    await pageInterface.addOrUpdate(page);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

beforeAll(async () => {
  const connection = await getConn();
  await connection.synchronize();

  await clearDb();
  await initEntities();
});

test('fetch pages', async () => {
  const allPages = await pageInterface.getAll({ relations: ['subcategory'] });

  const [firstPage] = allPages;

  expect(firstPage.name).toEqual('Testisivu');
  expect(firstPage.subcategory.name).toEqual('Alakategoria');
  expect(typeof firstPage.subcategoryId).toEqual('number');
});

test('fetch subcategories', async () => {
  const allSubcategories = await subcategoryInterface.getAll({ relations: ['category'] });

  const [firstSubcategory] = allSubcategories;

  expect(firstSubcategory.name).toEqual('Alakategoria');
  expect(firstSubcategory.category.name).toEqual('Testikategoria');
  expect(typeof firstSubcategory.categoryId).toEqual('number');
});

test('fetch categories', async () => {
  const allCategories = await categoryInterface.getAll();

  const [firstCategory] = allCategories;

  expect(firstCategory.name).toEqual('Testikategoria');
});
