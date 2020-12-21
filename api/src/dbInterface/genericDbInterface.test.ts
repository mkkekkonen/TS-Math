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

    const page1 = new Page();
    page1.name = 'Testisivu';
    page1.urlTitle = 'qwerty';
    page1.subcategory = subcategory;
    await pageInterface.addOrUpdate(page1);

    const page2 = new Page();
    page2.name = 'Testi 2';
    page2.urlTitle = 'foobar';
    page2.subcategory = subcategory;
    await pageInterface.addOrUpdate(page2);
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

describe('fetch', () => {
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
});

describe('sort', () => {
  test('sort pages', async () => {
    const allPages = await pageInterface.getAll();

    const [firstPage, secondPage] = allPages;

    expect(firstPage.name).toEqual('Testisivu');
    expect(secondPage.name).toEqual('Testi 2');

    const sortArr = [
      {
        id: firstPage.id,
        index: 2,
      },
      {
        id: secondPage.id,
        index: 1,
      },
    ];

    await pageInterface.updateMulti(sortArr);

    const resultPages = await pageInterface.getAll();

    const [firstRes, secondRes] = resultPages;

    expect(firstRes.name).toEqual('Testisivu');
    expect(firstRes.index).toEqual(2);

    expect(secondRes.name).toEqual('Testi 2');
    expect(secondRes.index).toEqual(1);
  });
});
