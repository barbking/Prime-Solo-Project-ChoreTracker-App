//controller for user booklog page
myApp.controller('UserBookLogController', ['$http', '$location','bookService', '$uibModal', '$log', function($http, $location, bookService, $uibModal, $log) {
  vm = this;
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
  }; // end addBook

}]);

//addBookModalInstanceCtrl
myApp.controller( 'addBookModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'bookService',function ( $uibModalInstance, $uibModal, $log, bookService) {
  var vm = this;

  vm.addNewBook = function(){
    if ( !vm.crop || !vm.variety || !vm.purchasedate || !vm.lotnum || !vm.quantity || !vm.itemcode || !vm.selectedSupplier ) {
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
        crop: vm.crop,
        variety: vm.variety,
        purchase_date: vm.purchasedate,
        lot_number: vm.lotnum,
        quantity: vm.quantity,
      };

      // console.log(itemToSend);
      bookService.addBook(itemToSend);
      swal({
        title: "Seed Added!",
        text: "New seed added to inventory!",
        type: "success",
        timer: 3500,
        confirmButtonText: "Ok"
      }); // end sweetalert
      $uibModalInstance.close();
    } // end if else
  }; //end add Item


  vm.cancel = function (){
    $uibModalInstance.close();
  }; // end cancel
}]); // end addBookModalInstanceCtrl
