myApp.service('bookService', ['$http', function($http){
  var self = this;
  self.books = { list: [] };
  self.userbooks = { list: [] };
  //save a new transaction in the db and update tasks []
  self.addBook = function(data) {
    console.log('data to save is:', data);
    return $http({
      method: 'POST',
      url: '/books',
      data: data
    }).then(function(response) {
      console.log('in service for addSeed with response-->', response );
      self.getUserBooks().then(function(){
        console.log('in service for addBook with response-->', response );
        console.log('self.userbooks from getUserBooks:',self.userbooks);
        return response;
      });
    }, function error ( response ){
      console.log( 'Error in addBook:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    });
  };//end of saveBook func
  //get call to server for all books in bank collection
  self.getBooks= function() {
    console.log('in booksService get');
    return $http({
      method: 'GET',
      url: '/books',
    }).then(function(response){
      self.books.list = response.data;
      console.log('self.books from getBooks:',self.books);
      return self.books;
    });
  };//end getBooks
  self.getBooks();
  //get call to server for user specific data in books collection
  self.getUserBooks = function() {
    console.log('in getUserBooks get');
    return $http({
      method: 'GET',
      url: '/books/userbooks',
    }).then(function(response){
      self.userbooks.list = response.data;
      console.log('self.userbooks from getUserBooks:',self.userbooks.list);
    });
  };//end getUserBooks
  self.getUserBooks();
  // delete a book in the db and update userbooks[]
  self.deleteBook = function(id) {
   console.log('in deleteBook');
   console.log('deleteBook:', id);
   return $http({
     method: 'DELETE',
     url: '/books/'+id,
   }).then(function(response) {
     console.log(response);
     self.getUserBooks();
   });
 };//end of deleteBook func
 // update task checkbox status upon box click and save
  self.updateBook = function (book) {
    console.log('in updateBook http request:', book);
     return $http({
      method: 'POST',
      url: '/books/update',
      data: book
    }).then(function(response){
      console.log(response);
      self.getBooks();
    });
  };//end updateBook func
}]);//end bank service
