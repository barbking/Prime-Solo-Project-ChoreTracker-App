myApp.controller('AdminBankController',['$http', '$location', '$filter', 'bankService', function($http, $location, $filter, bankService) {

  console.log('in AdminBankController');

  var vm = this;
  //get data from bank collection in db
  vm.bankTransactions = [];
  //usernames from db
  vm.usernames = [];
  // Upon load, check this user's session on the server
  $http.get('/admin').then(function(response) {
    console.log(response);
      if(response.data.username) {
          vm.firstname = response.data.firstname;
          vm.userName = response.data.username;
          console.log('vm.userName: ', vm.userName);
          vm.loadUsernames();
          vm.getBankTransactions().then(function(){
            vm.bankTransactions = bankService.bankTransactions;
            console.log(vm.bankTransactions);
          });
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
  //get usernames from database users collection to populate username selector
  vm.loadUsernames = function() {
    $http.get('/usernames').then(function(response) {
      vm.usernames = response.data;
      console.log('usernames[]',vm.usernames);
    });
  };
  //save bank transaction to db
  vm.addTransaction = function() {
    if(vm.bank.date == '' || vm.bank.username == '' || vm.bank.transaction == '' || vm.bank.amount == '' ) {
      vm.message = "Cannot enter a blank selection!";
    } else {
      //data to send to bank db
      data = {
        date: vm.bank.date,
        username: vm.bank.username,
        transaction: vm.bank.transaction,
        amount: vm.bank.amount
      };
      console.log('data to send to db:',data);
      bankService.saveTransaction(data);
    }//end of else/if
  };//end addTransaction

  // get tasks from database using tasks.service
  vm.getBankTransactions = bankService.getBankTransactions;

  // hide task list on button click
  vm.hideTransactions = function() {
    vm.bank=[];
    return vm.bank;
  };

  //logout function run on admin logout button click
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logOut func
}]);//end of AdminBankController
