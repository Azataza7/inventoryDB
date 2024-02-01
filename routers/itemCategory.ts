import { Router } from 'express';
import mysqlDb from '../mysqlDb';

const category = Router();

category.get('/', async (req, res) => {
  const [results] = await mysqlDb.getConnection().query(
    'SELECT id, category_name, description FROM category'
  );
  res.send(results);
});

category.get('/:id', async (req, res) => {
  res.send('ok');
});

category.post('/', async (req, res) => {
  res.send('ok');
});

category.put('/', async (req, res) => {
  res.send('ok');
});

category.delete('/', async (req, res) => {
  res.send('ok');
});

export default category;
