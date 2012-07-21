var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/db.sqlite');

this.newInstance = function() {
  return new impl();
};

function impl() {
  this.addUser = function(name, callback) {
    db.run("INSERT INTO user(name) VALUES(?)", [ name ]/*, function(error) {
      if (error) 
        console.log(error);

      callback((error)?false:true);
    }*/);
    callback(true); // TODO: Callback is not working!!
  };

  this.getUserById = function(id, callback) {
    db.all("SELECT rowid AS id, name FROM user WHERE id=?", [ id ], function(err, rows) {
      if (err) 
        console.log(err);

      callback((rows)?rows[0]:null);
    });
  };

  this.getUsers = function(callback) {
    db.all("SELECT rowid AS id, name FROM user", function(err, rows) {
      if (err) {
        console.log(err);
        rows = null;
      }

      callback(rows);
    });
  };

  this.removeUser = function(id, callback) {
    db.run("DELETE FROM user WHERE rowid=?", [ id ]/*, function(error) {
      if (error) 
        console.log(error);

      callback((error)?false:true);
    }*/);
    callback(true); // TODO: Callback is not working!!
  };

  this.updateUser = function(user, callback) {
    db.run("UPDATE user SET name=? WHERE rowid=?", [ user.name, user.id ]/*, function(error) {
      if (error) 
        console.log(error);

      callback((error)?false:true);
    }*/);
    callback(true); // TODO: Callback is not working!!
  };
}
