'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../server');
const { TEST_MONGODB_URI } =  require('../config');

const Note = require('../models/note');

const { notes } = require('../db/data');

const expect = chai.expect;
chai.use(chaiHttp);

before(function () {
  return mongoose.connect(TEST_MONGODB_URI)
    .then(() => mongoose.connection.db.dropDatabase());
});

beforeEach(function () {
  return Note.insertMany(notes);
});

afterEach(function () {
  return mongoose.connection.db.dropDatabase();
});

after(function () {
  return mongoose.disconnect();
});

describe('GET /api/notes', function(){
  it('should return the correct number of Notes', function(){
    //Calling db AND api at the same time
    //then wait for both promises to resolve with `Promise.all`
    return Promise.all([
      Note.find(),
      chai.request(app).get('/api/notes')
    ])
    //Compare the db and API results
      .then(([data, res])=>{
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(data.length);
      });
  });
});

describe('POST /api/notes', function() {
  it('should create and return a new item when provided valid data', function(){
    const newItem = {
      'title': 'The best article about cats ever!',
      'content': 'Lorem ipsum dolor sit amet'
    };

    let res;
    //#1, call the API
    return chai.request(app)
      .post('/api/notes')
      .send(newItem)
      .then(function (_res){
        res = _res;
        expect(res).to.have.status(201);
        expect(res).to.have.header('location');
        expect(res).to.be.json;
        expect(res).to.be.a('object');
        expect(res).to.have.keys('id','title','content','createdAt','updatedAt');

        //#2, call the database
        return Note.findById(res.body.id);
      })
    //#3, then compare the API and database responses
      .then(data => {
        expect(res.body.id).to.equal(data.id);
        expect(res.body.title).to.equal(data.title);
        expect(res.body.content).to.equal(data.content);
        expect(new Date(res.body.createdAt)).to.eql(data.createdAt);
        expect(new Date(res.body.updatedAt)).to.eql(data.updatedAt);
      });
  });
});