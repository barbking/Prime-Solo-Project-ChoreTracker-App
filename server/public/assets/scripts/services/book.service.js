myApp.service('bookService', ['$http', function($http){
  var vm = this;
  vm.books = [];
  //save a new transaction in the db and update tasks []
  vm.saveBook = function(data) {
    console.log('data to save is:', data);
    return $http({
      method: 'POST',
      url: '/books',
      data: data
    }).then(function(response) {
      console.log(response);
    });
  };//end of saveBook func
  //get call to server for all books in bank collection
  vm.getBooks= function() {
    console.log('in booksService get');
    return $http({
      method: 'GET',
      url: '/books',
    }).then(function(response){
      vm.books = response.data;
      console.log('vm.books from getBooks:',vm.books);
      return vm.books;
    });
  };//end getBooks
  //get call to server for user specific data in books collection
  vm.getUserBooks = function(username) {
    console.log('in getUserBooks get', username);
    return $http({
      method: 'GET',
      url: '/books/' + username,
    }).then(function(response){
      vm.books = response.data;
      console.log('vm.books from getUserBooks:',vm.books);
      return vm.books;
    });
  };//end getgetUserBankTransactions
//delete a task in the db and update tasks []
 //  vm.deleteTransaction = function(id) {
 //   console.log('in deleteTransaction');
 //   console.log('deleteTransaction:', id);
 //   return $http({
 //     method: 'DELETE',
 //     url: '/bank/'+id,
 //   }).then(function(response) {
 //     console.log(response);
 //    //  vm.bank = response.data;
 //    //  return vm.bank;
 //   });
 // };//end of deleteTask func
}]);//end bank service
