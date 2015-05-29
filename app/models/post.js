var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var safeOpts    = {
  j:        1,
  w:        "majority",
  wtimeout: 10000
};

var postSchema  = new Schema({
  saved_at:     { type: Date, default: Date.now },
  created_at_i: { type: Number },
  url:          String,
  title:        String,
  story_title:  String,
  story_url:    String,
  author:       String,
  num_comments: Number
}, { safe: safeOpts });

var Post = mongoose.model('Post', postSchema);

module.exports    = Post;