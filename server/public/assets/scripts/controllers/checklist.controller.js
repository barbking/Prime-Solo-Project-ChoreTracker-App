//controller for user chore page - controls task chart with checkboes
myApp.controller('CheckListController', [ '$http', '$location','tasksService', function($http, $location, tasksService){
  vm = this;
  vm.usertasks = [];
  // Upon load, check this user's session on the server and get username tasks from db
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.firstname = response.data.firstname;
          vm.userName = response.data.username;
          vm.allowance = response.data.allowance;
          console.log('get user response: ', response.data);
          //get username specific task using tasksService service
          tasksService.getUserTasks(vm.userName).then(function(){
            vm.usertasks = tasksService.usertasks;
            console.log('get usertasks:', vm.usertasks);
            vm.calcReward();
          }); //get tasks for this specific username
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });//end of $http get
  //data for progress bar (tasks completed/allwance calc percent)
  vm.calcReward = function (){
    var completedTasks = 0;
    var required = 0;
    for (i=0; i<=vm.usertasks.length-1; i++){
      completedTasks += parseInt(vm.usertasks[i].checkboxcount);
      required += parseInt(vm.usertasks[i].frequency);
    }
    vm.greenDone = (completedTasks/required)*100;
    console.log('green pie graph %', vm.greenDone);
    vm.allowanceEarned=((vm.greenDone/100)*(vm.allowance)).toFixed(0);
    console.log(vm.allowanceEarned);
    vm.progressPercent = 'width:' + vm.greenDone.toFixed(0) + '%';
    console.log(vm.progressPercent);
    vm.data = (vm.allowanceEarned,vm.progressPercent);
    return vm.data;
  };//end of calcReward
  //on checkbox click, run saveCheck func which calls service updateTask http PUT
  // vm.saveCheck = tasksService.updateTasks;
  // update task checkbox status upon box click and save
   vm.saveCheck = function (task) {
     console.log('in updateTask http request:', task);
    //counter to tack number of true/false checkboxes up to limit and save in db as checkboxcount
    counter = 0;
     for (var key in task){
       limit = task.frequency;
       console.log('limit:', limit);
       if (task[key] === true && counter < limit) {
         counter += 1;
       }
       task.checkboxcount = counter;
       console.log(task.checkboxcount);
     }
      return $http({
       method: 'POST',
       url: '/tasks/checkbox',
       data: task
     }).then(function(response){
       console.log(response);
       tasksService.getUserTasks(vm.userName).then(function(){
         vm.usertasks = tasksService.usertasks;
         console.log('get usertasks:', vm.usertasks);
         vm.calcReward();
       }); //get tasks for this specific username
     });
   };//end updateTasks func
  //user logout when logout button clicked
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logout func
}]);//end of CheckListController
