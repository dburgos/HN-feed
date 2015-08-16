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
        return res.status(500).send(err)
      }
      return res.status(200).send(isSingleMode ? posts[0] : posts);
    });
  },

  delete: function(req, res) {

    if(!req.params.id) {
      return res.status(400).send({ message: "Validation error: id is required"});
    }

    var query = {
      "_id": req.params.id
    };

    return models.Post.findOneAndRemove(query, function (err, post) {
      if(!post && !err) {
        return res.status(404).send({ message: 'Not found - This post does not exists' });
      }
      if (err || post == null) {
        return res.status(500).send(false);
      } else {
        return res.status(200).send(true);
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
          objectId:     res.hits[i].objectID,
          story_title:  res.hits[i].story_title,
          story_url:    res.hits[i].story_url,
          author:       res.hits[i].author,
          num_comments: res.hits[i].num_comments
        };

        var hasId     = data.objectId;
        var hasUrl    = (data.url   || data.story_url);
        var hasTitle  = (data.title || data.story_title);
        var isValid   = hasId && hasUrl && hasTitle;

        if(isValid) {
          models.Post.create(data);
        }
      }

      if(params.verbose) { console.info("> Finish"); }

    });
  }
};
