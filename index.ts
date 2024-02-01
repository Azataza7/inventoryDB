import express from 'express';
import cors from 'cors';
import category from './routers/itemCategory';
import location from './routers/itemLocation';
import inventory from './routers/inventory';
import mysqlDb from './mysqlDb';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/category', category);
app.use('/location', location);
app.use('/inventory', inventory);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
