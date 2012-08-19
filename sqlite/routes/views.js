var i18n = require('../public/javascripts/common/i18n');

this.route = function(app) {
  app.get('/', function(req, res){
      var lang = 'en';
      if (req.session.lang)
        lang = req.session.lang;

      i18n.setLanguage(lang);

      res.render('index', { 
        title: i18n._('List of users'), 
        lang: lang,
        text: {
          selectLanguage: i18n._('Select a language'),
          english: i18n._('English'),
          spanish: i18n._('Spanish')
        }
      });  
  });
}
