myApp.service('tasksService', ['$http', function($http){
  var vm = this;

  //array to hold response data from db for all tasks
   vm.tasks=[];
   //array to hold response data from db for username specific tasks
   vm.usertasks=[];

  //get tasks from db and populate tasks []
  vm.getTasks = function() {
    console.log('in getTasks http request');
    return $http({
      method: 'GET',
      url: '/tasks'
    }).then(function(response) {
        // console.log('vm.tasks:', response.data);
        vm.tasks = response.data;
        console.log('vm.task:',vm.tasks);
        return vm.tasks;
    });
  };//end getTasks func

  //run getTasks as soon as tasksService loaded so admin sees all db tasks on login
  // vm.getTasks();

  //save a task in the db and update tasks []
  vm.saveTask = function(task) {
    console.log('in saveTask');
    console.log('task to save is:', task);
    return $http({
      method: 'POST',
      url: '/tasks',
      data: task
    }).then(function(response) {
      console.log(response);
      vm.getTasks();
    });
  };//end of saveFavorite func

//delete a task in the db and update tasks []
  vm.deleteTask = function(id) {
   console.log('in deleteTask');
   console.log('deleteTask:', id);
   return $http({
     method: 'DELETE',
     url: '/tasks/'+id,
   }).then(function(response) {
     console.log(response);
     vm.tasks = response.data;
     return vm.tasks;
   });
 };//end of deleteTask func

 // get task from db for specific username and populate usertasks []
 vm.getUserTasks = function(username) {
   console.log('in getTasks http request');
   console.log('getUserTask for username',username);
   return $http({
     method: 'GET',
     url: '/tasks/'+username
   }).then(function(response) {
       console.log('getUserTask post db response:', response);
       vm.usertasks = response.data;
       console.log('vm.usertasks from getUserTask:',vm.usertasks);
       return vm.usertasks;
     //  return vm.tasks.list = response.data;
   });
 };//end getTasks func

}]);
