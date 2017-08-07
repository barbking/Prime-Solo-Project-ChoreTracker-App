//controller for user booklog page
myApp.controller('BonusRewardsController', ['$http', '$location','bookService', '$uibModal', '$log', function($http, $location, bookService, $uibModal, $log) {

  vm = this;
  vm.books = bookService.books;
  bookService.getBooks();
  console.log("controller",vm.books);
  //user logout when logout button clicked
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };//end of logout func
  vm.addReward = function ( book, size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-reward-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addRewardModalContent.html',
      controller: 'addRewardModalInstanceCtrl',
      controllerAs: 'armic',
      size: size,
      appendTo: parentElem,
      resolve: {
        book: function() {
          return book;
        }
      }
    }); // end modalInstance
  }; // end open book modal
}]);//end of UserBookLogController
//addBookModalInstanceCtrl
myApp.controller( 'addRewardModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'bookService','book', function ( $uibModalInstance, $uibModal, $log, bookService, book) {
  vm = this;
  vm.books = bookService.books;
  vm.username = book.username;
  vm.title = book.title;
  vm.pages = book.pages;
  vm.level = book.level;
  vm.book_id=book._id;
  //addReward
  vm.addReward = function(){
    if ( !vm.reward ) {
      console.log('inputs empty');
      swal({
        title: "Empty Fields!",
        text: "Please enter reward!",
        type: "error",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
    } else {
      var itemToSend = {
        reward: vm.reward,
        book_id: vm.book_id
      };
      console.log(itemToSend);
      //send data to service updateBook
      bookService.updateBook(itemToSend);
      swal({
        title: "Reward Added!",
        type: "success",
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
