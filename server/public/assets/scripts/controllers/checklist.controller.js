myApp.controller('CheckListController', [ '$http', '$location','tasksService', function($http, $location, tasksService){
  vm = this;
  vm.usertasks = [];
 //calc boxes with "true" values (boxes checked)



  // Upon load, check this user's session on the server and get username tasks from db
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.firstname = response.data.firstname;
          vm.userName = response.data.username;
          console.log('vm.userName: ', vm.userName);
          //get username specific task using tasksService service
          tasksService.getUserTasks(vm.userName).then(function(){
            vm.usertasks = tasksService.usertasks;
            console.log('get usertasks:', vm.usertasks);
          }); //get tasks for this specific username
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });//end of $http get

  //on checkbox click, run saveCheck func which calls service updateTask http PUT
  vm.saveCheck = tasksService.updateTasks;
  // vm.saveCheck = function (task, checkbox) {
  //   if(checkbox) {
  //     task.checkboxcount += 1;
  //   } else {
  //     task.checkboxcount -= 1;
  //   }
  //  console.log(task);
  //   // tasksService.updateTasks(task);
  // };



  //user logout when logout button clicked
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logout func


}]);
