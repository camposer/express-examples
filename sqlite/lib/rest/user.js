var userService = require('../service/user');

// For all http states see: http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
var HTTP_CODE_OK = 200
  , HTTP_CODE_UNAUTHORIZED = 401
  , HTTP_CODE_FORBIDDEN = 403
  , HTTP_CODE_NOT_FOUND = 404
  , HTTP_CODE_METHOD_NOT_ALLOWED = 405
  , HTTP_CODE_PRECONDITION_FAILED = 412;

var jsonResponseHeader = {'Content-Type': 'application/json; charset=utf-8'};

var ok = function(res) {
  res.writeHead(HTTP_CODE_OK, jsonResponseHeader);
};

var nok = function(res, code) {
  res.writeHead(code, jsonResponseHeader);
};

/******* FUNCTIONS ********/

this.addUser = function(req, res) {
  var params = req.body;

  if (params.name == null) {
    nok(res, HTTP_CODE_PRECONDITION_FAILED);
    res.end();
  } else {
    var response = userService.newInstance().addUser(params.name, function(response) {
      if (response)
        ok(res);
      else 
        nok(res, HTTP_CODE_FORBIDDEN);

      res.end(JSON.stringify(response));
    });
  }
};

this.getUserById = function(req, res) {
  var params = req.route.params;

  if (params.id == null) {
    nok(res, HTTP_CODE_PRECONDITION_FAILED);
    res.end();
  } else {
    var user = userService.newInstance().getUserById(params.id, function(user) {
      if (user != null)
        ok(res);
      else 
        nok(res, HTTP_CODE_NOT_FOUND);

      res.end(JSON.stringify(user));
    });
  }
};

this.getUsers = function(req, res) {
  var users = userService.newInstance().getUsers(function(users) {
    if (users != null)
      ok(res);
    else 
      nok(res, HTTP_CODE_NOT_FOUND);

    res.end(JSON.stringify(users));
  });
};

this.removeUser = function(req, res) {
  var params = req.body;

  if (params.id == null) {
    nok(res, HTTP_CODE_PRECONDITION_FAILED);
    res.end();
  } else {
    var response = userService.newInstance().removeUser(params.id, function(response) {
      if (response)
        ok(res);
      else 
        nok(res, HTTP_CODE_FORBIDDEN);

      res.end(JSON.stringify(response)); 
    });
  }
};

this.updateUser = function(req, res) {
  var params = req.body;

  if (params.id == null || params.name == null) {
    nok(res, HTTP_CODE_PRECONDITION_FAILED);
    res.end(); 
  } else {
    var response = userService.newInstance().updateUser(params, function(response) {
      if (response)
        ok(res);
      else 
        nok(res, HTTP_CODE_FORBIDDEN);

      res.end(JSON.stringify(response)); 
    });
  }
};


