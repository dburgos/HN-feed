var mongoose        = require("mongoose");
var models          = require("../models");
var config          = require("../../config");
var RESTClient      = require('node-rest-client').Client;

exports.UI = {
  list: function(req, res) {
    return res.render('home.jade');
  }
};

exports.API = {
  get: function (req, res) {

    var isSingleMode  = req.params.id && req.params.id != "null";
    var query         = {};
    var options       = {
      limit: 100,
      sort: {
        created_at_i: -1
      }
    }

    if(isSingleMode) {
      query._id       = req.params.id;
      options.limit   = 1;
    }

    return models.Post.find(query, null, options, function(err, posts) {
      if (err) {
        return res.send(500, err)
      }
      return res.send(200, isSingleMode ? posts[0] : posts);
    });
  },
  delete: function(req, res) {

    if(!req.params.id) {
      return res.send(400, { message: "Validation error: id is required"});
    }

    var query = {
      "_id": req.params.id
    };

    return models.Post.findOneAndRemove(query, function (err, post) {
      if(!post && !err) {
        return res.send(404, { message: 'Not found - This post does not exists' });
      }
      if (err || post == null) {
        return res.send(500, false);
      } else {
        return res.send(200, true);
      }
    });
  },
  load: function(params) {

    if(params.verbose) { console.info("Feed.API.load() init"); }

    var client = new RESTClient();

    if(params.verbose) { console.info("> Calling REST Client"); }

    // Request to the API
    client.get(config.app.feed.api, function(data){
      // Parse to JSON
      var res = JSON.parse(data.toString());

      if(params.verbose) { console.info(">> Received "+res.hits.length+" posts"); }

      // Save each one
      for(var i=0, total=res.hits.length; i<total; i++) {
        var data = {
          created_at_i: res.hits[i].created_at_i,
          url:          res.hits[i].url,
          title:        res.hits[i].title,
          story_title:  res.hits[i].story_title,
          story_url:    res.hits[i].story_url,
          author:       res.hits[i].author,
          num_comments: res.hits[i].num_comments
        };

        var hasUrl    = (data.url   || data.story_url);
        var hasTitle  = (data.title || data.story_title);
        var isValid   = hasUrl && hasTitle;

        if(isValid) {
          models.Post.create(data);
        }
      }

      if(params.verbose) { console.info("> Finish"); }

    });
  }
};