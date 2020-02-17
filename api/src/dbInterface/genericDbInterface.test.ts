import { Page, Category, Subcategory } from '../entities';
import { GenericDbInterface } from '.';

const pageInterface = new GenericDbInterface(Page);
const categoryInterface = new GenericDbInterface(Category);
const subcategoryInterface = new GenericDbInterface(Subcategory);

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
  await clearDb();
  await initEntities();
});

test('fetch pages', async () => {
  const allPages = await pageInterface.getAll();

  console.log('All pages:');
  console.log(JSON.stringify(allPages));
});
