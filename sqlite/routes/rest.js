var userRest = require('../lib/rest/user');
var BASE_URL = '/rest';

this.route = function(app) {
  this.users(app);
};

this.users = function(app) {
  app.get(BASE_URL + '/users', userRest.getUsers);
  app.get(BASE_URL + '/users/:id', userRest.getUserById);
  app.put(BASE_URL + '/users', userRest.addUser);
  app.delete(BASE_URL + '/users', userRest.removeUser); 
  app.post(BASE_URL + '/users', userRest.updateUser);
};

