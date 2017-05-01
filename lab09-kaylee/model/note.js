'use strict';

const debug = require('debug')('http:note');
const uuid = require('uuid/v4');

module.exports = function(name, date) {
  if(!name || !date) throw new Error('Invalid arguments. Please supply a valid name and date.');
  this.name = name;
  this.date = date;
  this.id = uuid();
};
