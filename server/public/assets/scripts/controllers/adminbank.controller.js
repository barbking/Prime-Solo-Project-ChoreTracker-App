myApp.controller('AdminBankController',['$http', '$location', '$filter', 'tasksService', function($http, $location, $filter, tasksService) {

  console.log('in AdminBankController');

  var vm = this;
  //get data from bank collection in db
  vm.bank = [];
  //type of transaction
  vm.tansaction = ["deposit", "withdrawal"];
  //usernames from db
  vm.usernames = [{username:"sarahking"}, {username:"connorking"}];
  // Upon load, check this user's session on the server
  $http.get('/admin').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          // vm.userName = response.data.username;
          // console.log('User Data: ', vm.userName);
          vm.firstname = response.data.firstname;
          vm.userName = response.data.username;
          console.log('vm.userName: ', vm.userName);
          // tasksService.getTasks().then(function(){
          //   vm.tasks = tasksService.usertasks;
          //   console.log('get usertasks:', vm.tasks);
          // }); //get tasks for this specific username
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };

  //get usernames from database users collection to populate username selector
  vm.loadUsernames = function() {
    return vm.usernames.length ? null : $http.get('/usernames').then(function(response) {
      vm.usernames = response.data;
      console.log('username[]',vm.usernames);
    });
  };


  // get tasks from database using tasks.service
  vm.loadTasks = function() {
       $http.get('/tasks').then(function(response) {
    //  return vm.tasks.length ? null : $http.get('/tasks').then(function(response) {
      console.log('in loadTasks, task[]:', response.data);
      vm.tasks = response.data;
      return vm.tasks;
      // return tasksService.getTasks;
    });
  };
  // hide task list on button click
  vm.hideTasks = function() {
    vm.tasks=[];
    return vm.tasks;
  };

  //logout function run on admin logout button click
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logOut func
}]);//end of AdminController
