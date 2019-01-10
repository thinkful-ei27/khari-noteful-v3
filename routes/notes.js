'use strict';

const express = require('express');
const router = express.Router();

const Note = require('../models/note');



/* ========== GET/READ ALL ITEMS ========== */
router.get('/', async (req, res) => {

  console.log('Get All Notes');
  res.json([
    { id: 1, title: 'Temp 1' },
    { id: 2, title: 'Temp 2' },
    { id: 3, title: 'Temp 3' }
  ]);

  const { searchTerm } = req.query;

  let notes = await Note
    .find()
    .sort({ createdAt: 1 });
  if(!searchTerm){
    notes = await Note.find(searchTerm);
  }
  res.send(notes);
});


/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', async (req, res)=> {

  console.log('Get a Note');
  res.json({ id: 1, title: 'Temp 1' });

  const id = req.params.id;

  const note = await
  Note
    .findById(id);
  if(!note) return res.status(404).send('Note not found');

  res.send(note);
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', async (req, res)=> {

  console.log('Create a Note');
  res.location('path/to/new/document')
    .status(201).json({ id: 2, title: 'Temp 2' });

  const newNote = {
    name: req.body.name,
    content: req.body.content
  };

  const notes = await 
  newNote.save();
  res.send(newNote);

});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', async (req, res)=> {

  console.log('Update a Note');
  res.json({ id: 1, title: 'Updated Temp 1' });

  const { id } = req.params;
  const { title, content } = req.body;

  const updateNote = {title, content};

  const note = await Note
    .findByIdAndUpdate(id, updateNote, {new: true});
  if(!note) return res.status(404).send('Note not found');

  res.send(note);
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', async (req, res)=> {

  console.log('Delete a Note');
  res.sendStatus(204);

  const id = req.params.id;

  const note = await
  Note
    .findOneAndDelete({_id: id});
  if (!note) return res.status(404).send('Note not found');

  res.send(note);
});

module.exports = router;
