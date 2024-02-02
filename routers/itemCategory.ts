import { Router } from 'express';
import mysqlDb from '../mysqlDb';
import { RowDataPacket } from 'mysql2';
import { category } from '../types';

const category = Router();

category.get('/', async (req, res) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, category_name, description FROM category'
    );
    res.send(results);
  } catch (e) {
    res.send(e);
  }
});

category.get('/:id', async (req, res) => {
  const [results] = await mysqlDb.getConnection().query(
    'SELECT id, category_name, description FROM category WHERE id = ?',
    [req.params.id]
  ) as RowDataPacket[];

  const categories = results[0];

  if (!categories) {
    return res.status(404).send({error: 'Not Found'});
  }

  res.send(categories);
});

category.post('/', async (req, res) => {
  const category: category = {
    id: req.body.id,
    category_name: req.body.category_name,
    description: req.body.description,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO category (category_name, description) VALUES (?, ?)',
      [category.category_name, category.description]
    );

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

category.put('/:id', async (req, res) => {
  const category: category = {
    id: req.body.id,
    category_name: req.body.category_name,
    description: req.body.description,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'UPDATE category SET category_name = ?, description = ? WHERE id = ?',
      [category.category_name, category.description, req.params.id]
    );

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

category.delete('/:id', async (req, res) => {
  try {
    const [result] = await mysqlDb.getConnection().query(
      'DELETE FROM category WHERE id = ?',
      [req.params.id]
    );

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

export default category;
