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

  let schemaName = storage[schema];
  if(!schemaName) return Promise.reject(new Error('schema not found'));

  let note = schemaName[id];
  if(!note) return Promise.reject(new Error('note note found fetchNote'));

  return fs.readFileProm(`${__dirname}/../data/${id}.json`)
  .then(data => {
    console.log('successfully reading file in fetchNote', data);
  })
  .catch(console.error('error reading file in fetchNote'));
};

exports.updateNote = function(schema, note) {
  debug('#updateNote');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!note) return Promise.reject(new Error('note required'));

  let schemaName = storage[schema];
  if(!schemaName) return Promise.reject(new Error('schema not found'));

  schemaName[note.id] = note;
  if(!note) return Promise.reject(new Error('note not found updateNote'));

  return fs.readFileProm(`${__dirname}/../data/${note.id}.json`)
  .then(data => {
    let oldNote = JSON.parse(data.toString());
    if(oldNote.name) oldNote.name = note.name;
    if(oldNote.date) oldNote.date = note.date;
    fs.writeFileProm(`${__dirname}/../data/${note.id}.json`, oldNote);
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
