myApp.controller('CheckListController', [ '$http', '$location','tasksService', function($http, $location, tasksService){
  vm = this;
  console.log('checking user');
  vm.tasks = [];
  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          // vm.userName = response.data.username;
          vm.userName = response.data.firstname;
          console.log('User Data: ', vm.userName);
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });//end of $http get

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logout func
//get tasks using taskService
  vm.getTasks = function(){
    tasksService.getTasks().then(function (data){
      vm.tasks = data;
    });
  };//end of getTasks func
}]);
