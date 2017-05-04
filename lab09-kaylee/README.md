## Lab-09: Single-Resource API with FS Persistence

## About This Project

* Build an HTTP server using the 'http' Node module.
* Create an Object constructor used to produce instances of a resource.
* Create a Router constructor to manage GET, POST, PUT and DELETE requests to the server.
* Implement file system (FS) persistence

## Project Dependencies

* chai, chai-http, debug, bluebird, fs and uuid
* To install:
  * npm chai
  * npm chai-http
  * npm debug
  * npm bluebird
  * npm fs
  * npm uuid

## Developer Dependencies

* mocha
* To install:
  * npm mocha

## Making Requests

* Example GET request
  * In terminal (assuming httPie installed): http get :3000/api/note?id=<some uuid>
  * Expected output:
    {
      "date": "April 30",
      "id": "<some uuid>",
      "name": "ToDo"
    }
  * Expected status code: 200

* Example POST request
  * In terminal (assuming httPie installed): http post :3000/api/note name="Groceries" date="April 20"
  * Expected output:
    {
      "date": "April 20",
      "id": "<some uuid>",
      "name": "Groceries"
    }
  * Expected status code: 201

* Example PUT request
  * In terminal (assuming httPie installed): http put :3000/api/note?id=<some uuid> name="newName" date="newDate"
  * Expected output:
    {
      "date": "newDate",
      "id": "<some uuid>",
      "name": "newName"
    }
  * Expected status code: 202


* Example DELETE request
  * In terminal (assuming httPie installed): http delete :3000/api/note?id=<some uuid>
  * Expected output: none
  * Expected status code: 204


## Biggest Roadblocks

* The PUT method in storage.js!
