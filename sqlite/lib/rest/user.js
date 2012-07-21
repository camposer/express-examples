var common = require('./common');
var userService = require('../service/user');

this.addUser = function(req, res) {
  var params = req.body;

  common.call(
    res, 
    params.name, 
    function(name) { 
      var valid = true;

      if (name == null) 
        valid = false; 
  
      return valid;
    },
    userService.newInstance().addUser
  );
};

this.getUserById = function(req, res) {
  var params = req.route.params;

  common.call(
    res, 
    params.id, 
    function(id) { 
      var valid = true;

      if (id == null) 
        valid = false; 
  
      return valid;
    },
    userService.newInstance().getUserById
  );
};

this.getUsers = function(req, res) {
  common.call(
    res, 
    null, // No params
    function(params) { return true },
    userService.newInstance().getUsers
  );
};

this.removeUser = function(req, res) {
  var params = req.body;

  common.call(
    res, 
    params.id, 
    function(id) { 
      var valid = true;

      if (id == null) 
        valid = false; 
  
      return valid;
    },
    userService.newInstance().removeUser
  );
};

this.updateUser = function(req, res) {
  var params = req.body;

  common.call(
    res, 
    params, 
    function(params) { 
      var valid = true;

      if (params.id == null || params.name == null) 
        valid = false; 
  
      return valid;
    },
    userService.newInstance().updateUser
  );
};


