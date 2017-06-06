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
  };


}]);
