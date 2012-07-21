this.route = function(app) {
  app.get('/', function(req, res){
      res.render('index', { title: 'Express', session: req.session });
    }
  );
};
