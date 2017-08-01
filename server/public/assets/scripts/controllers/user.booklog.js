//controller for user booklog page
myApp.controller('UserBookLogController', ['$http', '$location','booksService', function($http, $location, booksService) {
  vm = this;
  //user logout when logout button clicked
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logout func

}]);
