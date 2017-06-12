myApp.service('bankService', ['$http', function($http){
  var vm = this;
  vm.bank = [];
  //save a new transaction in the db and update tasks []
  vm.saveTransaction = function(data) {
    console.log('data to save is:', data);
    return $http({
      method: 'POST',
      url: '/bank',
      data: data
    }).then(function(response) {
      console.log(response);
      // vm.getTasks();
    });
  };//end of saveFavorite func
  //get call to server for all data in bank collection
  vm.getBankTransactions = function() {
    console.log('in bankService get');
    return $http({
      method: 'GET',
      url: '/bank',
    }).then(function(response){
      vm.bank = response.data;
      console.log('vm.bankTransactions from getBankTransactions:',vm.bank);
      return vm.bank;
    });
  };//end getBankTransactions
  //get call to server for user specific data in bank collection
  vm.getUserBankTransactions = function(username) {
    console.log('in getUserBankService get', username);
    return $http({
      method: 'GET',
      url: '/bank/' + username,
    }).then(function(response){
      vm.bank = response.data;
      console.log('vm.bankfrom getUserBankTransactions:',vm.bank);
      return vm.bank;
    });
  };//end getgetUserBankTransactions
//delete a task in the db and update tasks []
  vm.deleteTransaction = function(id) {
   console.log('in deleteTransaction');
   console.log('deleteTransaction:', id);
   return $http({
     method: 'DELETE',
     url: '/bank/'+id,
   }).then(function(response) {
     console.log(response);
    //  vm.bank = response.data;
    //  return vm.bank;
   });
 };//end of deleteTask func
}]);//end bank service
