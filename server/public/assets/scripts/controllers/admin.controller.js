myApp.controller('AdminController',['$http', '$location', '$filter', 'tasksService', function($http, $location, $filter, tasksService) {

  console.log('in AdminController');

  var vm = this;

  vm.user = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''

  };

  // vm.tasks = [];
  vm.tasks = tasksService.tasks;


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
          vm.userName = response.data.username;
          console.log('User Data: ', vm.userName);
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
  //show username data in editable table
  vm.showUsername = function(user) {
    if(user.username && vm.usernames.length) {
      var selected = $filter('filter')(vm.usernames, {id: user.username});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return user.username || 'Not set';
    }
  };
  //show frequency data in editable table
  vm.showFrequency = function(user) {
    var selected = [];
    if(vm.user.frequency) {
      selected = $filter('filter')(vm.statuses, {value: vm.user.frequency});
    }
    return selected.length ? selected[0].text : 'Not set';
  };
  // get tasks from database using tasks.service
  vm.loadTasks = function() {
     return vm.tasks.length ? null : $http.get('/tasks').then(function(response) {
      console.log('in loadTasks, task[]:', response.data);
      return tasksService.getTasks;
    });
  };
  // save a task to database upon save button click and using task.service.js
  vm.saveTask = function(data, id) {
    angular.extend(data, {id: id});
    console.log('saveTask data:',data);
    // return $http.post('/tasks', data);
    return tasksService.saveTask;
  };
  // remove a task from table and database upon delete button click
  vm.removeTask = function(index,id) {
    vm.tasks.splice(index, 1);
    console.log('removeTask id:',id);
    return $http.delete('/tasks/'+id);
  };
  // add a task input to tasks[] to populate xeditable table
  vm.addTask = function() {
    console.log('addTask', vm.inserted);
    vm.inserted = {
      id: vm.tasks.length+1,
      description: '',
      frequency: '',
      username: '',
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
