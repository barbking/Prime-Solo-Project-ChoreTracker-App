//controller for user home page
myApp.controller('UserController', ['$http', '$location', function($http, $location) {
  // This happens after view/controller loads -- not ideal but it works for now.
  var vm = this;
  //checking user
  console.log('checking user');
  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          // vm.userName = response.data.username;
          vm.userName = response.data.firstname;
          console.log('User Data: ', vm.userName);
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });
  //logout user
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };
  //pie graph variables and settings
  vm.labels = ["Needs to be done to get allowance!", "Completed Chores.  Great Job!"];
  vm.data = [700,300];
  //Make sure to use color codes, instead of color name.
  vm.colorsPie = ['#DC143C', '#008000'];
  vm.optionsPie = {
        legend: { display: true },
        responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
        scales: {
            yAxes: [
              {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
              }]
        }
    };
    vm.clickme = function($event){
        alert("You've clicked upon "+$event[0]._view.label);
    };
}]);//end of UserController
