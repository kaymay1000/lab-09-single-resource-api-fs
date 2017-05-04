'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const storage = {};

module.exports = exports = {};

exports.createNote = function(schema, note) {
  debug('#createNote');
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!note) return Promise.reject(new Error('note required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][note.id] = note;

  let newNote;
  return fs.writeFileProm(`${__dirname}/../data/${note.id}.json`, JSON.stringify(note))
  .then(() => {
    return fs.readFileProm(`${__dirname}/../data/${note.id}.json`)
    .then(data => {
      newNote = JSON.parse(data.toString());
    })
    .catch(err => console.error(err));
  })
  .then(() => {
    return newNote;
  })
  .catch(err => {
    console.error('error writing file in createNote', err.message);
  });
};

exports.fetchNote = function(schema, id) {
  debug('#fetchNote');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then(data => {
    console.log('successfully reading file in fetchNote', data);
    return JSON.parse(data.toString());
  })
  .catch(console.error('error reading file in fetchNote'));
};

exports.updateNote = function(schema, id, newNote) {
  debug('#updateNote');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!newNote) return Promise.reject(new Error('new note required'));
  if(!id) return Promise.reject(new Error('existing note not found updateNote'));

  let schemaName = storage[schema];
  if(!schemaName) return Promise.reject(new Error('schema not found'));

  schemaName[id] = newNote;
  console.log(newNote, 'this should be new data');

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then(data => {
    let oldNote = JSON.parse(data.toString());
    if(oldNote.name) oldNote.name = newNote.name;
    if(oldNote.date) oldNote.date = newNote.date;
    if(oldNote.id) oldNote.id = newNote.id;
    fs.writeFileProm(`${__dirname}/../data/${id}.json`, JSON.stringify(newNote));
  })
  .catch(console.error('Error reading file in updateNote'));
};


exports.deleteNote = function(schema, id) {
  debug('#deleteNote');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  return fs.unlinkProm(`${__dirname}/../data/${id}.json`)
  .then(data => {
    console.log(`deleteNote fs.unlinkProm`, data);
  })
  .catch(console.error(`could not delete file in fs.unlinkProm`));
};
