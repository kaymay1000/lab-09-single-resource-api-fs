'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const storage = {};

module.exports = exports = {};

exports.createNote = function(schema, note) {
  debug('#createNote');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!note) return reject(new Error('note required'));
    if(!storage[schema]) storage[schema] = {};

    storage[schema][note.id] = note;
    resolve(note);
  });
};

exports.fetchNote = function(schema, id) {
  debug('#fetchNote');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let note = schemaName[id];
    if(!note) return reject(new Error('note note found'));
    resolve(note);
  });
};

exports.updateNote = function(schema, note) {
  debug('#updateNote');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!note) return reject(new Error('note required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    schemaName[note.id] = note;
    if(!note) return reject(new Error('note not found'));
    resolve(note);
  });
};

exports.deleteNote = function(schema, id) {
  debug('#deleteNote');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('note not found'));
    delete schemaName[id];
    resolve();
  });
};
