'use strict';

const debug = require('debug')('http:note-routes.js');
const Note = require('../model/note.js');
const storage = require('../lib/storage.js');

module.exports = function(router){

  router.get('/api/note', function(req, res) {
    debug('GET /api/note');
    if(req.url.query.id) {
      storage.fetchNote('note', req.url.query.id)
      .then(note => {
        console.log(note, 'line 14 router.get');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('note not found router.get');
        res.end();
      });
    }
    else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.post('/api/note', function(req, res) {
    debug('POST /api/note');
    try {
      let note = new Note(req.body.name, req.body.date);
      console.log(note, 'note in router.post');
      storage.createNote('note', note)
      .then(newNote => {
        res.writeHead(201, {'Content-Type': 'application/json'});
        console.log('inside then block post', newNote);
        res.write(JSON.stringify(newNote));
        res.end();
      });
    } catch(e) {
      console.error(e, 'error in router.post catch');
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.put('/api/note', function(req, res) {
    debug('PUT /api/note');
    console.log(req.body, 'req.body put');
    try {
      let note = new Note(req.body.name, req.body.date);
      storage.updateNote('note', req.body.id, req.body);
      res.writeHead(202, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  });

  router.delete('/api/note', function(req, res) {
    debug('DELETE /api/note');
    console.log(req.body, 'req.body delete');
    try {
      storage.deleteNote('note', req.url.query.id);
      res.writeHead(204, {'Content-Type': 'application/json'});
      res.write('note deleted');
      res.end();
    } catch(e) {
      console.error(e);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('note not found router.delete');
      res.end();
    }
  });
};
