'use strict';

const express = require('express');

const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', async (req, res) => {

  console.log('Get All Notes');
  res.json([
    { id: 1, title: 'Temp 1' },
    { id: 2, title: 'Temp 2' },
    { id: 3, title: 'Temp 3' }
  ]);

  const searchTerm = req.query;

  const products = await 
  Product
  .find()
  .sort({ createdAt: 1 });
  res.send(products);

});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', async (req, res)=> {

  console.log('Get a Note');
  res.json({ id: 1, title: 'Temp 1' });

  const id = req.params.id;

  const product = await
  Note
  .findById(id);
  if(!note) return res.status(404).send('Product not found');

  res.send(note)
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', async (req, res)=> {

  console.log('Create a Note');
  res.location('path/to/new/document').status(201).json({ id: 2, title: 'Temp 2' });

  const note = {
    name: req.body.name,
    content: req.body.content
  };

  await product.save();
  res.send(note);

});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', async (req, res)=> {

  console.log('Update a Note');
  res.json({ id: 1, title: 'Updated Temp 1' });

});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', async (req, res)=> {

  console.log('Delete a Note');
  res.sendStatus(204);

  const id = req.params.id;

  const note = await
  Note
  .findOneAndDelete({_id: id});
  if (!product) return res.status(404.).send('Note not found')

  res.send(product);
});

module.exports = router;
