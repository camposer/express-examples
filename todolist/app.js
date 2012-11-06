
/**
 * Module dependencies.
 */
const BASE_API = '/api/v1';

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , todosRest = require('./lib/rest/todos');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get(BASE_API + '/todos', todosRest.getAll); // Get all
app.get(BASE_API + '/todos/:id', todosRest.getById); // Get by id
app.put(BASE_API + '/todos', todosRest.add); // Add 
app.post(BASE_API + '/todos', todosRest.modify); // Update
app.delete(BASE_API + '/todos/:id', todosRest.remove); // Delete by id

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
