myApp.controller('FunStuffController', ['$http', '$location', '$filter', function($http, $location, $filter) {

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };
  
}]);
