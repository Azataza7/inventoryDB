import { Router } from 'express';
import mysqlDb from '../mysqlDb';
import { RowDataPacket } from 'mysql2';
import { inventoryType, inventoryTypeWithoutDate } from '../types';

const inventory = Router();

inventory.get('/', async (req, res) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT i.id, c.category_name, l.section_name, i.date_registration, i.item_name, i.description FROM inventory_items i \n' +
      'LEFT JOIN category c on c.id = i.category_id\n' +
      'LEFT JOIN location l on i.location_id = l.id;\n'
    );
    res.send(results);
  } catch (e) {
    res.send(e);
  }
});

inventory.get('/:id', async (req, res) => {
  const [results] = await mysqlDb.getConnection().query(
    'SELECT i.id, c.category_name, l.section_name, i.date_registration, i.item_name, i.description FROM inventory_items i\n' +
    'LEFT JOIN category c on c.id = i.category_id\n' +
    'LEFT JOIN location l on i.location_id = l.id\n' +
    'WHERE i.id = ?',
    [req.params.id]
  ) as RowDataPacket[];

  const inventory = results[0];

  if (!inventory) {
    return res.status(404).send({error: 'Not Found'});
  }

  res.send(inventory);
});

inventory.post('/', async (req, res) => {
  const inventory: inventoryType = {
    id: req.body.id,
    category_id: req.body.category_id,
    location_id: req.body.location_id,
    item_name: req.body.item_name,
    description: req.body.description,
    date_registration: new Date().toISOString(),
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO inventory_items (category_id, location_id, item_name, description, date_registration) ' +
      'VALUES (?, ?, ?, ?, ?)',
      [inventory.category_id, inventory.location_id, inventory.item_name, inventory.description, inventory.date_registration]
    );

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

inventory.put('/:id', async (req, res) => {
  const inventory: inventoryTypeWithoutDate = {
    id: req.body.id,
    category_id: req.body.category_id,
    location_id: req.body.location_id,
    item_name: req.body.item_name,
    description: req.body.description,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'UPDATE inventory_items SET category_id = ?, location_id = ?, item_name = ?, description = ? WHERE id = ?',
      [inventory.category_id, inventory.location_id, inventory.item_name, inventory.description, req.params.id]
    );

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

inventory.delete('/:id', async (req, res) => {
  try {
    const [result] = await mysqlDb.getConnection().query(
      'DELETE FROM inventory_items WHERE id = ?',
      [req.params.id]
    );

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

export default inventory;