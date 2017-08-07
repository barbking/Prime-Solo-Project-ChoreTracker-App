//controller for user booklog page
myApp.controller('UserBookLogController', ['$http', '$location','bookService', '$uibModal', '$log', function($http, $location, bookService, $uibModal, $log) {
  vm = this;
  vm.userbooks = bookService.userbooks;
  bookService.getUserBooks();
  console.log("controller",vm.userbooks);
  // Upon load, check this user's session on the server and get username books from db
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.firstname = response.data.firstname;
          vm.username = response.data.username;
          console.log('get user response: ', response.data);
          //get username specific books
          bookService.getUserBooks().then(function(){
          vm.userbooks = bookService.userbooks;
          console.log('get userbooks:', vm.userbooks);
        });
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });//end of $http get
  //user logout when logout button clicked
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logout func
  vm.addBook = function ( size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-book-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addBookModalContent.html',
      controller: 'addBookModalInstanceCtrl',
      controllerAs: 'abmic',
      size: size,
      appendTo: parentElem,
      resolve: {
      }
    }); // end modalInstance
  }; // end open book modal
  vm.delete = function (id) {
    swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    },
    function(){
      swal("Deleted!", "success");
      console.log("in delete book controller");
      bookService.deleteBook(id);
      bookService.getUserBooks().then(function(){
        vm.userbooks = bookService.userbooks;
        console.log('get userbooks:', vm.userbooks);
     });
    });
 };//end delete function
}]);//end of UserBookLogController
//addBookModalInstanceCtrl
myApp.controller( 'addBookModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'bookService',function ( $uibModalInstance, $uibModal, $log, bookService) {
  vm = this;

  vm.addNewBook = function(){
    if ( !vm.title || !vm.author || !vm.pages || !vm.level || !vm.summary || !vm.date ) {
      console.log('inputs empty');
      swal({
        title: "Empty Fields!",
        text: "Please enter all fields!",
        type: "error",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      var itemToSend = {
        title: vm.title,
        author: vm.author,
        pages: vm.pages,
        level: vm.level,
        summary: vm.summary,
        date: vm.date,
        // username: vm.userName
      };
      console.log(itemToSend);
      bookService.addBook(itemToSend);
      swal({
        title: "Book Added!",
        text: "Today a reader, tomorrow a leader.",
        imageUrl: "/views/images/thumbs-up.png",
        // type: "success",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
      $uibModalInstance.close();
   }// end if else
 };//end add Item
  vm.cancel = function (){
    $uibModalInstance.close();
  }; // end cancel
}]); // end addBookModalInstanceCtrl
