myApp.controller('AdminBankController',['$http', '$location', '$filter', 'bankService', function($http, $location, $filter, bankService) {

  console.log('in AdminBankController');

  var vm = this;
  //get data from bank collection in db
  vm.bankTransactions = [];
  //usernames from db
  vm.usernames = [];
  //balance for each username
  vm.balance = [];
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
            vm.calcBalance();
          });//end getBankTransactions func

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
      for (i=0; i<=vm.usernames.length-1; i++){
        if (vm.usernames[i].admin) {
          console.log('loop:',vm.usernames[i]);
          vm.usernames.splice(vm.usernames[i],1);
      }
      console.log('usernames[]',vm.usernames);
      return vm.usernames;
    }
  });
};//end of loadUsernames
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

  // calculate balances for each user account
  vm.calcBalance = function(){
    console.log('in calcBalance');
    for (i=0; i<=vm.usernames.length-1; i++){
      for (j=0; j<=vm.bankTransactions.length-1; j++) {
        if ((vm.bankTransactions[j].username === vm.usernames[i].username) && vm.bankTransactions[j].transaction === "deposit") {
          vm.usernames[i].balance =+ parseInt(vm.bankTransactions[j].amount);
          // console.log('username bal', vm.usernames[i].balance);
        } else if ((vm.bankTransactions[j].username === vm.usernames[i].username) && vm.bankTransactions[j].transaction === "withdrawal"){
          vm.usernames[i].balance =- parseInt(vm.bankTransactions[j].amount);
        }
      }
        var username = vm.usernames[i].username;
        var balance = vm.usernames[i].balance;
        var userBal = {
          username: username,
          balance: balance
        };
        console.log ('userBal',userBal);
        vm.balance.push(userBal);
  }
};//end of calcBalance

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
