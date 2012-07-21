
/*
 * GET home page.
 */
var userRest = require('../lib/rest/user');

exports.index = function(req, res){
  res.render('index', { title: 'Express', session: req.session });
};

exports.addUser = function(req, res){
  userRest.addUser(req, res);
};

exports.getUserById = function(req, res){
  userRest.getUserById(req, res);
};

exports.getUsers = function(req, res){
  userRest.getUsers(req, res);
};

exports.removeUser = function(req, res){
  userRest.removeUser(req, res);
};

exports.updateUser = function(req, res){
  userRest.updateUser(req, res);
};
