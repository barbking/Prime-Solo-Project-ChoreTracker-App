myApp.controller('AdminController', ['$http', '$location', '$filter', function($http, $location, $filter) {

  console.log('in AdminController');

  var vm = this;

  vm.user = {
    firstname: '',
    lastname: '',
    username: '',
    password: ''

  };

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


    vm.tasks = [
      // {id: 1, name: 'Practice Music', frequency: 2, username: 4},
      // {id: 2, name: 'Feed Cat', frequency: undefined, username: 3},
      // {id: 3, name: 'Clean Room', frequency: 2, username: null}
    ];

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

    //get tasks from database
    vm.loadTasks = function() {
      return vm.tasks.length ? null : $http.get('/tasks').then(function(response) {
        console.log('in loadTasks, task[]:', response.data);
        vm.tasks = response.data;
      });
    };


    //get usernames from database
    vm.loadUsernames = function() {
      return vm.usernames.length ? null : $http.get('/usernames').then(function(response) {
        vm.usernames = response.data;
        console.log('username[]',vm.usernames);
      });
    };

    vm.showUsernames = function(user) {
      if(user.usernane && vm.usernames.length) {
        var selected = $filter('filter')(vm.usernames, {id: user.username});
        return selected.length ? selected[0].text : 'Not set';
      } else {
        return user.groupName || 'Not set';
      }
    };
    //show 1-7 in selector
    vm.showFrequencies = function(user) {
      var selected = [];
      if(vm.user.frequency) {
        selected = $filter('filter')(vm.statuses, {value: vm.user.frequency});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    // vm.checkName = function(data, id) {
    //   if (id === 2 && data !== 'awesome') {
    //     return "Username 2 should be `awesome`";
    //   }
    // };

    vm.saveTask = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      console.log('saveTask data:',data);
      return $http.post('/tasks', data);
    };

    // remove user
    vm.removeTask = function(index) {
      vm.tasks.splice(index, 1);
    };

    // add user
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
    };

}]);//end AdminController
