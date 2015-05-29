(function(){
  'use strict';
    angular
      .module('feedApp')
      .factory('API', ['$http', function($http) {
      return {
        Posts: {
          getAll:function(){
            return $http.get('api/feed/');
          },
          get:function(id){
            return $http.get('api/feed/'+id);
          },
          delete:function(id){
            return $http.delete('api/feed/'+id, {
              headers:{
                'Content-Type':'application/json'
              }
            });
          }
        }
      }
  }]);
})();