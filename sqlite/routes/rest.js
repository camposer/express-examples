var userRest = require('../lib/rest/user');

this.route = function(app) {
  this.users(app);
};

this.users = function(app) {
  app.get('/users', function(req, res) {
      userRest.getUsers(req, res);
    }
  );
  app.get('/users/:id', function(req, res) {
      userRest.getUserById(req, res);
    }
  );
  app.put('/users', function(req, res) {
      userRest.addUser(req, res);
    }
  );
  app.delete('/users', function(req, res) {
      userRest.removeUser(req, res);
    }
  ); 
  app.post('/users', function(req, res) {
      userRest.updateUser(req, res);
    }
  );
};

