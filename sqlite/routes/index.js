var views = require('./views');
var rest = require('./rest');

exports.route = function(app) {
  views.route(app);
  rest.route(app);
};
