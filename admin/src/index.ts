import express from 'express';
import expressHandlebars from 'express-handlebars';

const run = async () => {
  const app = express();

  const handlebars = expressHandlebars.create();

  app.use(express.static('src/assets'));
  app.use(express.static('src/content'));

  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');
  app.set('views', 'src/views');

  app.get('/', async (req, res) => {
    res.render('home');
  });

  app.use((req, res) => {
    res.render('notFound');
  });

  const port = process.env.PORT || 3001;
  console.log(`Debugger listening at port ${port}`);
  app.listen(port);
};

run();
