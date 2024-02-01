import { Router } from 'express';
import mysqlDb from '../mysqlDb';

const inventory = Router();

inventory.get('/', async (req, res) => {
  const [results] = await mysqlDb.getConnection().query(
    'SELECT i.id, c.category_name, l.section_name, i.date_registration, i.item_name, i.description FROM inventory_database.inventory_items i\n' +
    'LEFT JOIN inventory_database.category c on c.id = i.category_id\n' +
    'LEFT JOIN inventory_database.location l on i.location_id = l.id;\n'
  );
  res.send(results);
});

inventory.get('/:id', async (req, res) => {
  res.send('ok');
});

inventory.post('/', async (req, res) => {
  res.send('ok');
});

inventory.put('/', async (req, res) => {
  res.send('ok');
});

inventory.delete('/', async (req, res) => {
  res.send('ok');
});

export default inventory