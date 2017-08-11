myApp.controller('BankController', [ '$http', '$location', 'bankService', function($http, $location, bankService){
  vm = this;
  console.log('checking user');
  vm.bank = [];
  // Upon load, check this user's session on the server
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.userName = response.data.username;
          vm.firstName = response.data.firstname;
          console.log('User Data: ', vm.userName);
          bankService.getUserBankTransactions(vm.userName).then(function(){
          vm.bank = bankService.bank;
          vm.calcBalance(vm.bank);
          });
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });//end get user
  vm.calcBalance = function (array) {
    vm.balance = 0;
    for (i=0; i<=array.length-1; i++) {
      if (array[i].transaction == "deposit") {
        vm.balance = vm.balance + parseInt(array[i].amount);
      } else {
        vm.balance = vm.balance - parseInt(array[i].amount);
      }
    }
    console.log('BankController balance:',vm.balance);
    return vm.balance;
  };//end calcBalance
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end logout
}]);//end BankController
