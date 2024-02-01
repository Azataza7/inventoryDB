import { Router } from 'express';
import mysqlDb from '../mysqlDb';

const location = Router();

location.get('/', async (req, res) => {
  const [results] = await mysqlDb.getConnection().query(
    'SELECT id, section_name, description FROM location'
  );
  res.send(results);
});

location.get('/:id', async (req, res) => {
  res.send('ok');
});

location.post('/', async (req, res) => {
  res.send('ok');
});

location.put('/', async (req, res) => {
  res.send('ok');
});

location.delete('/', async (req, res) => {
  res.send('ok');
});

export default location