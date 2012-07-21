var userDao = require('../dao/user');

this.newInstance = function() {
  return new impl();
};

function impl() {

  this.addUser = function(name, callback) {
    userDao.newInstance().addUser(name, callback);
  };

  this.getUserById = function(id, callback) {
    userDao.newInstance().getUserById(id, callback);
  };

  this.getUsers = function(callback) {
    userDao.newInstance().getUsers(callback);
  };

  this.removeUser = function(id, callback) {
    userDao.newInstance().removeUser(id, callback);
  };

  this.updateUser = function(user, callback) {
    userDao.newInstance().updateUser(user, callback);
  };
}
