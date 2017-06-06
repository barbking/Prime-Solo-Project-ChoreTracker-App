myApp.controller('BankController', [ '$http', '$location', 'bankService', function($http, $location, bankService){
  vm = this;
  console.log('checking user');
  vm.bank = [];
  vm.sortedBank = [];
  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.userName = response.data.username;
          vm.firstName = response.data.firstname;
          console.log('User Data: ', vm.userName);
          bankService.getUserBankTransactions(vm.userName).then(function(){
          vm.bank = bankService.bankTransactions;
          });
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });
  //sort out bank transactions to deposit/withdrawal types ot display in table
  sortFunc = function (array){
    for (i=0; i<=array.length-1; i++) {


    }

  };

  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };

}]);
