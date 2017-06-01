myApp.service('tasksService', ['$http', function($http){
  var vm = this;

  //array to hold response data from database
   vm.tasks=[];

  //get task from db and populate task []
  vm.getTasks = function() {
    console.log('in getTasks http request');
    return $http({
      method: 'GET',
      url: '/tasks'
    }).then(function(response) {
        console.log('vm.tasks:', response.data);
        vm.tasks = response.data;
        return vm.tasks;
      //  return vm.tasks.list = response.data;
    });
  };//end getTasks func

  //run getTasks as soon as tasksService loaded so admin sees all db tasks on login
  vm.getTasks();

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
      vm.tasks = response.data;
      return vm.tasks;
    });
  };//end of saveFavorite func

  

}]);
