var myApp = angular.module('myApp', ['ngRoute','xeditable']);

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // get rid of 1.6.4 #!
  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: "LoginController as lc"
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: "LoginController as lc"
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: "UserController as uc"
    })
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: "AdminController as ac"
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);
