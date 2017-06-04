var myApp = angular.module('myApp', ['ngRoute','xeditable','chart.js']);

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
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: "AdminController as ac"
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: "UserController as uc"
    })
    .when('/checklist', {
      templateUrl: '/views/templates/checklist.html',
      controller: "CheckListController as clc"
    })
    .when('/bank', {
      templateUrl: '/views/templates/bank.html',
      controller: "BankController as bc"
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);
