this.route = function(app) {
  app.get('/', function(req, res){
      res.render('index', { title: 'List of users', session: req.session });
    }
  );
};
