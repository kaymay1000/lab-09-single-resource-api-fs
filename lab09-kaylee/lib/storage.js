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

  return fs.writeFileProm(`../data/${note.id}.txt`, JSON.stringify(note))
  .then(data => {
    console.log('successfully writing file in createNote', data);
  })
  .catch(console.error('error writing file in createNote'));
};

exports.fetchNote = function(schema, id) {
  debug('#fetchNote');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  let schemaName = storage[schema];
  if(!schemaName) return Promise.reject(new Error('schema not found'));

  let note = schemaName[id];
  if(!note) return Promise.reject(new Error('note note found'));

  return fs.readFileProm(`../data/${id}.txt`)
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
  if(!note) return Promise.reject(new Error('note not found'));

  return fs.readFileProm(`../data/${note.id}.txt`)
  .then(data => {
    let oldNote = JSON.parse(data.toString());
    if(oldNote.name) oldNote.name = note.name;
    if(oldNote.date) oldNote.date = note.date;
    fs.writeFileProm(`../data/${note.id}.txt`, oldNote);
  })
  .catch(console.error('Error reading file in updateNote'));
};


exports.deleteNote = function(schema, id) {
  debug('#deleteNote');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!id) return Promise.reject(new Error('id required'));

  let schemaName = storage[schema];
  if(!schemaName) return Promise.reject(new Error('note not found'));
  delete schemaName[id];

  return fs.unlinkProm(`../data/${id}.txt`)
  .then(console.log(`${id}.txt deleted successfully`))
  .catch(console.error(`Could not delete file ${id}.txt`));
};
