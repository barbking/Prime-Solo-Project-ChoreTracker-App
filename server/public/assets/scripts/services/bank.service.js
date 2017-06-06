myApp.service('bankService', ['$http', function($http){
  var vm = this;
  var bankTransactions = [];
  //save a task in the db and update tasks []
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
      vm.bankTransactions = response.data;
      console.log('vm.bankTransactions from getBankTransactions:',vm.bankTransactions);
      return vm.bankTransactions;
    });
  };//end getBankTransactions
  //get call to server for user specific data in bank collection
  vm.getUserBankTransactions = function(username) {
    console.log('in getUserBankService get', username);
    return $http({
      method: 'GET',
      url: '/bank/' + username,
    }).then(function(response){
      vm.bankTransactions = response.data;
      console.log('vm.bankTransactions from getUserBankTransactions:',vm.bankTransactions);
      return vm.bankTransactions;
    });
  };//end getgetUserBankTransactions
}]);//end bank service
