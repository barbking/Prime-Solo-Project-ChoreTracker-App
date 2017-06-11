myApp.controller('AdminBankController',['$http', '$location', '$filter', 'bankService', function($http, $location, $filter, bankService) {

  console.log('in AdminBankController');

  var vm = this;
  //get data from bank collection in db
  vm.bank = [];
  //usernames from db
  vm.usernames = [];
  //balance for each username
  vm.balance = [];
  vm.transaction = [
    {value: 1, text: 'withdrawal'},
    {value: 2, text: 'deposit'}
  ];
  // Upon load, check this user's session on the server
  $http.get('/admin').then(function(response) {
    console.log(response);
      if(response.data.username) {
          vm.firstname = response.data.firstname;
          vm.userName = response.data.username;
          console.log('vm.userName: ', vm.userName);
          vm.loadUsernames();
          vm.getBankTransactions().then(function(){
            vm.bank = bankService.bank;
            console.log(vm.bank);
            vm.calcBalance();
          });//end getBankTransactions func

      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });
  //get usernames from database users collection to populate username selector
  vm.loadUsernames = function() {
    $http.get('/usernames').then(function(response) {
      vm.usernames = response.data;
      for (i=0; i<=vm.usernames.length-1; i++){
        if (vm.usernames[i].admin) {
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
        amount: vm.bank.amount,
        comment: vm.bank.comment
      };
      console.log('data to send to db:',data);
      bankService.saveTransaction(data).then(function(){
        vm.getBankTransactions().then(function(){
          vm.bank = bankService.bank;
          console.log(vm.bank);
          vm.calcBalance();
        });//end getBankTransactions func
      });
    }//end of else/if
  };//end addTransaction
  //delete transaction
  vm.deleteTransaction = function (index, id){
    vm.bank.splice(index, 1);
    console.log('remove transaction id:',id);
     bankService.deleteTransaction(id).then(function(response) {
     console.log(response);
     vm.loadUsernames();
     vm.getBankTransactions().then(function(){
       vm.bank = bankService.bank;
       console.log(vm.bank);
       vm.calcBalance();
     console.log('removeUser',vm.usernames);
     });
   });
  };
  // get tasks from database using bank.service
  vm.getBankTransactions = bankService.getBankTransactions;

  // calculate balances for each user account
  vm.calcBalance = function(){
    vm.balance =[];
    console.log('in calcBalance');
    for (i=0; i<=vm.usernames.length-1; i++){
      var counter = 0;
      for (j=0; j<=vm.bank.length-1; j++) {
        if (vm.usernames[i].username == vm.bank[j].username) {
          counter = counter + parseInt(vm.bank[j].amount);
          console.log('username:',vm.usernames[i].username,'counter:',counter);
        }
      }//end j loop
        var username = vm.usernames[i].username;
        balance = counter;
        var userBal = {
          username: username,
          balance: balance
        };//end obj
        console.log ('userBal',userBal);
        vm.balance.push(userBal);
    }//end i for loop
};//end of calcBalance

// xeditable
//show username data in editable table if usernames[] contains bankTransactions.transaction val
vm.showUsername = function(item) {
  if(item.username && vm.usernames.length) {
    //check to see if vm.username contains task.username
    var selected = $filter('filter')(vm.usernames, {username: item.username});
    return selected.length ? selected[0].username : 'Not set';
  } else {
    return item.username || 'Not set';
  }
};
//show transaction data in editable table if transaction[] contains bankTransactions.transaction val
vm.showTransaction = function(item) {
  var selected = [];
  if(item.transaction) {
    selected = $filter('filter')(vm.transaction, {text: item.transaction});
  }
  return selected.length ? selected[0].text : 'Not set';
};

vm.checkAmount = function(data,item_id) {
 if (data === 'empty') {
   return "Enter an amount";
 }
};
vm.checkDate = function(data,item_id) {
 if (data === 'empty') {
   return "Enter a new date";
 }
};
vm.checkComment = function(data,item_id) {
 if (data === 'empty') {
   return "Enter a comment";
 }
};

//logout button function
vm.logout = function() {
  $http.get('/user/logout').then(function(response) {
    console.log('logged out');
    $location.path("/home");
  });
};
// save a transaction to database upon save button click
vm.saveTransaction = function(data, id) {
  angular.extend(data, {_id: id});
  console.log('save bank data:',data);
  $http.post('/bank/update', data).then(function(){
    vm.calcBalance();
  });
 };
}]);//end of AdminBankController
