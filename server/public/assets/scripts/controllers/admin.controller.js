myApp.controller('AdminController', ['$http', '$location', function($http, $location) {
  console.log('in AdminController');

  var vm = this;

  vm.user = {
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
      },
      function(response) {
        console.log('error');
        vm.message = "Please try again.";
      });
    }
  };//end addUser

}]);
