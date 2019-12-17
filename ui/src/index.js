const path = require('path');
const fs = require('fs');
const util = require('util');

const express = require('express');
const expressHandlebars = require('express-handlebars');

const readdir = util.promisify(fs.readdir);

const getFiles = async () => {
  const dir = path.resolve(__dirname, 'content', 'mathScripts');
  const files = await readdir(dir);
  return files.filter(file => !file.endsWith('.js.map'));
};

const mapFiles = files => {
  return files.map(file => {
    const [name] = file.split('.');
    return {
      url: file,
      name,
    };
  });
};

const getCommonData = async () => {
  return {
    files: mapFiles(await getFiles()),
  };
};

const run = async () => {
  const app = express();

  const handlebars = expressHandlebars.create({
    helpers: {},
  });

  app.use(express.static('src/assets'));
  app.use(express.static('src/content'));

  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');
  app.set('views', 'src/views');

  app.get('/', async (req, res) => {
    res.render('home', { ...(await getCommonData()) });
  });

  app.get('/:pageName', async (req, res) => {
    const { pageName } = req.params;
    const commonData = await getCommonData();
    
    const file = commonData.files.find(file => file.name === pageName);

    if (!file) {
      res.render('notFound', { ...commonData });
      return;
    }

    res.render('page', { ...commonData, file, partial: () => file.name });
  });

  const port = process.env.PORT || 3000;
  console.log(`Listening at localhost:${port}`);
  app.listen(port);
};

run();