import { Router } from 'express';
import mysqlDb from '../mysqlDb';
import { RowDataPacket } from 'mysql2';
import { location } from '../types';

const location = Router();

location.get('/', async (req, res) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, section_name, description FROM location'
    );
    res.send(results);
  } catch (e) {
    res.send(e);
  }
});

location.get('/:id', async (req, res) => {
  const [results] = await mysqlDb.getConnection().query(
    'SELECT id, section_name, description FROM location WHERE id = ?',
    [req.params.id]
  ) as RowDataPacket[];

  const locations = results[0];

  if (!locations) {
    return res.status(404).send({error: 'Not Found'});
  }

  res.send(locations);
});

location.post('/', async (req, res) => {
  const locationItem: location = {
    id: req.body.id,
    section_name: req.body.section_name,
    description: req.body.description
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO location (section_name, description) VALUES (?, ?)',
      [locationItem.section_name, locationItem.description]
    );
    res.send(result);
  } catch (e) {
    res.send(e);
  }

});

location.put('/:id', async (req, res) => {
  const location: location = {
    id: req.body.id,
    section_name: req.body.section_name,
    description: req.body.description,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'UPDATE location SET section_name = ?, description = ? WHERE id = ?',
      [location.section_name, location.description, req.params.id]
    );

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

location.delete('/:id', async (req, res) => {
  try {
    const [result] = await mysqlDb.getConnection().query(
      'DELETE FROM location WHERE id = ?',
      [req.params.id]
    );

    res.send(result);
  } catch (e) {
    res.send(e);
  }
});

export default location;