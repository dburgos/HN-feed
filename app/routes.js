'use strict';

module.exports = function(app) {
  var feed          = require('./controllers/feed');

  /* API */
  app.route('/api/feed/:_id?')
    .get(feed.API.get)
    .delete(feed.API.delete);

  /* Common pages */
  app.get('/', feed.UI.list);

  // 404
  app.use(function(req, res, next){
    res.status(404);
    var data = {
      status: 404,
      url: req.url
    };
    res.render('404.jade', data);
  });

  // 500
  app.use(function(err, req, res, next){
    res.status(500);
    var data = {
      status: err.status || 500,
      err: err
    };
    res.render('500.jade', data);
  });
};