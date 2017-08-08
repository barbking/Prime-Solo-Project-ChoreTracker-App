var myApp = angular.module('myApp', ['ngRoute','xeditable','chart.js','ui.bootstrap']);

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
    .when('/adminbank', {
      templateUrl: '/views/templates/adminbank.html',
      controller: "AdminBankController as abc"
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
    .when('/funstuff', {
      templateUrl: '/views/templates/funstuff.html',
      controller: "FunStuffController as fc"
    })
    .when('/userbooklog', {
      templateUrl: '/views/templates/user.booklog.html',
      controller: "UserBookLogController as ubl"
    })
    .when('/adminbonusrewards', {
      templateUrl: '/views/templates/adminbonusrewards.html',
      controller: "BonusRewardsController as brc"
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);
