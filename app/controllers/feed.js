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
      limit: 100
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
          url: res.hits[i].url,
          title: res.hits[i].title,
          story_title: res.hits[i].story_title,
          author: res.hits[i].author,
          num_comments: res.hits[i].num_comments
        };
        models.Post.create(data);
      }

      if(params.verbose) { console.info("> Finish"); }

    });
  },
  delete: function(req, res) {
    return res.send(200, true);
  }
};