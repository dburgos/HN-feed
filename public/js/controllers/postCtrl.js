(function(){
  'use strict';

  angular
    .module('feedApp')
    .controller('feedCtrl', ['$scope','API', feedCtrl]);

  function feedCtrl($scope, API) {
    'use strict';
    /* jshint validthis: true */
    var vm    = this;
    vm.list   = null;

    API.Posts.getAll().success(function(data) {
      if(data && data.length > 0) {
        vm.list = data;
      } else {
        vm.list = [];
      }
    });

    $scope.getDateLabel = function(post) {
      var now   = moment();
      var post  = moment(new Date(post.created_at_i*1000));
      var diff  = now.diff(post, 'days', true);

      if(diff < 1) {
        // Same day
        return post.format("h") + ":" + post.format("mm") + " " + post.format("a");
      }
      if(diff >= 1 && diff < 2) {
        return "Yesterday";
      }
      if(diff >= 2) {
        return post.format("MMM") + " " + post.format("D");
      }
    }

    $scope.openLink = function(row) {
      angular.element(row).find("a.link").click();
    }

  }
})();