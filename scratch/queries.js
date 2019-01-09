'use strict';

const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');




//find/ search for notes with Note.find
mongoose.connect(MONGODB_URI, { useNewUrlParser:true})
  .then(()=>{
    const searchTerm = 'lady gaga';
    let filter = {};

    if(searchTerm){
      filter.title = { $regex: searchTerm, $options: 'i'};
      filter.content = { $regex: searchTerm, $options: 'i'};
    }

    return Note.find({$or: [filter]}).sort({updatedAt: 'desc' });
  })
  .then(results =>{
    console.log(results);
  })
  .then(()=>{
    return mongoose.disconnect();
  })
  .catch(err =>{
    console.error(err.message);
  });

//find note by id using Note.findById
mongoose.connect(MONGODB_URI, { useNewUrlParser:true})
  .then(()=>{
    const id = '111111111111111111111103';

    return Note.findById(id);
  })
  .then(result =>{
    console.log(result);
  })
  .then(()=>{
    return mongoose.disconnect();
  })
  .catch(err =>{
    console.error(err.message);
  });



//create a new note using Note.create
mongoose.connect(MONGODB_URI, { useNewUrlParser:true})
  .then(()=>{

    const newObj ={
      title: 'New note',
      content: 'New content'
    };

    return Note.create(newObj);
  })
  .then(result =>{
    console.log(result);
  })
  .then(()=>{
    return mongoose.disconnect();
  })
  .catch(err =>{
    console.error(err.message);
  }); 



//Update a note by id using Note.findByIdAndUpdate
mongoose.connect(MONGODB_URI, {useNewUrlParser:true})
  .then(()=>{
    const targetId = '111111111111111111111106';

    const updates = {
      title: 'This is what is',
      content: 'known as a note beyond a note'
    };

    return Note.findOneAndUpdate(targetId, {$set: updates}, {new: true});
  })
  .then(result =>{
    console.log(result);
  })
  .then(()=>{
    return mongoose.disconnect();
  })
  .catch(err =>{
    console.error(err.message);
  });



//Delete a note by id using Note.findByIdAndRemove
mongoose.connect(MONGODB_URI, {useNewUrlParser:true})
  .then(()=>{
    const targetId = '111111111111111111111108';

    return Note.findOneAndDelete({_id: targetId});
  })
  .then(result =>{
    console.log(result);
  })
  .then(()=>{
    return mongoose.disconnect();
  })
  .catch(err =>{
    console.error(err.message);
  });


