How I've created this app:

*******************
Setup
*******************

* Create project
$ express --sessions --ejs

* Install required packages
$ npm install

* Install Mocha!
$ sudo npm install -g mocha

*******************
Web side
*******************

* Add routes inside app.js
const BASE_API = "/api/v1";
var todosRest = require('./lib/rest/todos');

app.get(BASE_API + '/todos', todosRest.getAll); // Get all
app.get(BASE_API + '/todos/:id', todosRest.getById); // Get by id
app.put(BASE_API + '/todos', todosRest.add); // Add 
app.post(BASE_API + '/todos', todosRest.modify); // Update
app.delete(BASE_API + '/todos/:id', todosRest.remove); // Delete by id

* Develop REST logic
