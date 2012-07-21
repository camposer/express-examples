var userRest = require('../lib/rest/user');
var BASE_URL = '/rest';

this.route = function(app) {
  this.users(app);
};

this.users = function(app) {
  app.get(BASE_URL + '/users', function(req, res) {
      userRest.getUsers(req, res);
    }
  );
  app.get(BASE_URL + '/users/:id', function(req, res) {
      userRest.getUserById(req, res);
    }
  );
  app.put(BASE_URL + '/users', function(req, res) {
      userRest.addUser(req, res);
    }
  );
  app.delete(BASE_URL + '/users', function(req, res) {
      userRest.removeUser(req, res);
    }
  ); 
  app.post(BASE_URL + '/users', function(req, res) {
      userRest.updateUser(req, res);
    }
  );
};

