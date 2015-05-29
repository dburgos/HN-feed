'use strict';

module.exports = {

  settings: {
    port: 3000,
    db: 'mongodb://localhost:27017/hn-feed',
  },

  feed: {
    api: 'http://hn.algolia.com/api/v1/search_by_date?query=nodejs'
  }

};