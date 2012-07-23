/** 
* @fileOverview User REST services facade (express-examples/sqlite)
*
* @author Rodolfo Campos <camposer at gmail dot com>
* @version 1.0
*/

/** 
 * Common REST services library
 * @field
 */
var common = require('./common');

/**
 * User service (business logic)
 * @field
 */
var userService = require('../service/user');

/**
 * REST facade for addUser service. PUT /rest/users
 * @function 
 * @param {HttpRequest} req HTTP request
 * @param {HttpResponse} req HTTP response
 */
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

/**
 * REST facade for getUserById service. GET /rest/users/:id 
 * @function 
 * @param {HttpRequest} req HTTP request
 * @param {HttpResponse} req HTTP response
 */
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

/**
 * REST facade for getUsers service. GET /rest/users
 * @function 
 * @param {HttpRequest} req HTTP request
 * @param {HttpResponse} req HTTP response
 */
this.getUsers = function(req, res) {
  common.call(
    res, 
    null, // No params
    function(params) { return true },
    userService.newInstance().getUsers
  );
};

/**
 * REST facade for removeUser service. DELETE /rest/users
 * @function 
 * @param {HttpRequest} req HTTP request
 * @param {HttpResponse} req HTTP response
 */
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

/**
 * REST facade for updateUser service. POST /rest/users
 * @function 
 * @param {HttpRequest} req HTTP request
 * @param {HttpResponse} req HTTP response
 */
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