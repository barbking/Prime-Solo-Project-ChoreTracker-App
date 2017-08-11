myApp.controller('AdminController',['$http', '$location', '$filter', 'tasksService', function($http, $location, $filter, tasksService) {

  console.log('in AdminController');

  var vm = this;
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
          vm.firstname = response.data.firstname;
          vm.userName = response.data.username;
          console.log('vm.userName: ', vm.userName);
          vm.loadTasks();
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });
 //logout button function
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };
  //add child user account to database
  vm.addUser = function() {
    if(vm.user.username === '' || vm.user.firsname === '' || vm.user.lastname === '' || vm.user.password === '' || vm.user.admin === '') {
      swal({
        title: "Empty Fields!",
        text: "All fields except calendar are required!",
        type: "error",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      console.log('sending to server...', vm.user);
      $http.post('/register', vm.user).then(function(response) {
        console.log('success', vm.user);
        vm.user = {};
        vm.loadUsernames();
        console.log('adduser',vm.usernames);
        swal({
          title: "User Added!",
          type: "success",
          timer: 3500,
          confirmButtonText: "Ok"
        }); // end sweetalert
      },
      function(response) {
        console.log('error');
        vm.message = "Please try again.";
      });
    }
  };//end addUser
  //delete user
  vm.removeUser = function (id){
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      swal("Deleted!", "success");
      $http({
       method: 'DELETE',
       url: '/user/'+id,
     }).then(function(response) {
       console.log(response);
       vm.loadUsernames();
       console.log('removeUser',vm.usernames);
    });
   });
  };
  //to reset all user checkboxes to false, run resetCheckBoxes func which calls service updateTask http PUT
  vm.resetCheckBoxes = function (username){
    swal({
      title: "Are you sure you want to reset the users checkboxes?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, reset!",
      closeOnConfirm: false
    },
    function(){
      swal("Checkboxes reset!", "success");
      tasksService.resetTasks(username);
    });
  };
  //get usernames from database users collection to populate username selector
  vm.loadUsernames = function() {
    $http.get('/usernames').then(function(response) {
    // return vm.usernames.length ? null : $http.get('/usernames').then(function(response) {
      vm.usernames = response.data;
      console.log('in loadUsernames()',vm.usernames);
    });
  };//end loadUsernames
  //show users on button click
  vm.isVisible = false;
  vm.showHide = function () {
    vm.loadUsernames();
    //If DIV is visible it will be hidden and vice versa.
    vm.isVisible = vm.isVisible ? false : true;
  };
  //show username data in editable table if usernames[] contains task.username val
  vm.showUsername = function(task) {
    if(task.username && vm.usernames.length) {
      //check to see if vm.username contains task.username
      var selected = $filter('filter')(vm.usernames, {username: task.username});
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
    if (id === undefined){
      console.log('in save task - no id');
      angular.extend(data, {id: id});
      return $http.post('/tasks', data);
    } else {
      angular.extend(data, {_id: id});
      console.log('saveTask update data:',data);
      return $http.post('/tasks/update', data);
    // tasksService.saveTask;
    }
  };
  // remove a task from table and database upon delete button click
  vm.removeTask = function(index,id) {
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      swal("Deleted!", "success");
      vm.tasks.splice(index, 1);
      console.log('removeTask id:',id);
      return $http.delete('/tasks/'+id);
    });
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

  vm.mySortFunction = function(task) {
    if(isNaN(task[vm.sortExpression]))
      return task[vm.sortExpression];
    return parseInt(task[vm.sortExpression]);
  };

}]);//end of AdminController
