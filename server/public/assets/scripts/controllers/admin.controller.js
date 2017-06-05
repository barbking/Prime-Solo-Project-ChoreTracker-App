myApp.controller('AdminController',['$http', '$location', '$filter', 'tasksService', function($http, $location, $filter, tasksService) {

  console.log('in AdminController');

  var vm = this;

  // vm.user = {
  //   firstname: '',
  //   lastname: '',
  //   username: '',
  //   password: ''
  //
  // };

  vm.tasks = [];
  console.log('tasks:', vm.tasks);
  // vm.tasks = tasksService.tasks;


  vm.frequencies = [
    {value: 1, text: '1'},
    {value: 2, text: '2'},
    {value: 3, text: '3'},
    {value: 4, text: '4'},
    {value: 5, text: '5'},
    {value: 6, text: '6'},
    {value: 7, text: '7'}
  ];

  vm.usernames = [];

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

  //add child user account to database
  vm.addUser = function() {
    if(vm.user.username == '' || vm.user.password == '') {
      vm.message = "Choose a username and password!";
    } else {
      console.log('sending to server...', vm.user);
      $http.post('/register', vm.user).then(function(response) {
        console.log('success');
        vm.user = {};
      },
      function(response) {
        console.log('error');
        vm.message = "Please try again.";
      });
    }
  };//end addUser

  //get usernames from database users collection to populate username selector
  vm.loadUsernames = function() {
    return vm.usernames.length ? null : $http.get('/usernames').then(function(response) {
      vm.usernames = response.data;
      console.log('username[]',vm.usernames);
    });
  };
  //show username data in editable table if usernames[] contains task.username val
  vm.showUsername = function(task) {
    if(task.username && vm.usernames.length) {
      console.log ('showUsername',task.username, vm.usernames.length);
      //check to see if vm.username contains task.username
      var selected = $filter('filter')(vm.usernames, {username: task.username});
      console.log('selected', selected);
      return selected.length ? selected[0].username : 'Not set';
    } else {
      return task.username || 'Not set';
    }
  };
  //show frequency data in editable table if frequencies[] contains task.frequency val
  vm.showFrequency = function(task) {
    var selected = [];
    if(task.frequency) {
      selected = $filter('filter')(vm.frequencies, {value: task.frequency});
    }
    return selected.length ? selected[0].text : 'Not set';
  };

  vm.checkName = function(data,task_id) {
   if (data === 'empty') {
     return "Enter a task name";
   }
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
  // save a task to database upon save button click and using task.service.js
  vm.saveTask = function(data, id) {
    angular.extend(data, {id: id});
    console.log('saveTask data:',data);
    return $http.post('/tasks', data);
    // tasksService.saveTask;
  };
  // remove a task from table and database upon delete button click
  vm.removeTask = function(index,id) {
    vm.tasks.splice(index, 1);
    console.log('removeTask id:',id);
    return $http.delete('/tasks/'+id);
    // tasksService.deleteTask;
  };
  // add a task input to tasks[] to populate xeditable table
  vm.addTask = function() {
    console.log('addTask', vm.inserted);
    vm.inserted = {
      id: vm.tasks.length+1,
      description: '',
      frequency: null,
      username: null,
    };
    vm.tasks.push(vm.inserted);
    console.log('addTask tasks[]:',vm.tasks);
  };//end of addTask func
  //logout function run on admin logout button click
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logOut func
}]);//end of AdminController
