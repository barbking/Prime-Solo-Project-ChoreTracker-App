//controller for user home page
myApp.controller('UserController', ['$http', '$location','tasksService','$sce', function($http, $location, tasksService,$sce) {

  var vm = this;
  vm.data = [];
  //logout user
  vm.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  };

  // get task data from database and calc data for pie graph
  $http.get('/user').then(function(response) {
      if(response.data.username) {
          // user has a curret session on the server
          vm.firstname = response.data.firstname;
          vm.userName = response.data.username;
          vm.allowance = response.data.allowance;
          vm.calendar = $sce.trustAsResourceUrl(response.data.calendar);
          //get username specific task using tasksService service
          tasksService.getUserTasks(vm.userName).then(function(){
          vm.usertasks = tasksService.usertasks;
          console.log('get usertasks in user controller:', vm.usertasks);
          vm.calcPieGraphPercent();
        });
      } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
      }
  });//end of $http get

  vm.calcPieGraphPercent = function (){
    var completedTasks = 0;
    var required = 0;
    for (i=0; i<=vm.usertasks.length-1; i++){
      completedTasks += parseInt(vm.usertasks[i].checkboxcount);
      required += parseInt(vm.usertasks[i].frequency);
    }
    vm.greenDone = (completedTasks/required)*100;
    console.log('green pie graph %', vm.greenDone);
    vm.redNotDone = 100 - vm.greenDone;
    vm.data = [vm.redNotDone.toFixed(0),vm.greenDone.toFixed(0)];
    vm.valuenow=((vm.greenDone/100)*(vm.allowance)).toFixed(0);
    console.log(vm.valuenow);
    vm.progressPercent = 'width:' + vm.greenDone.toFixed(0) + '%';
    console.log(vm.progressPercent);
    return vm.data;
  };//end of calcPieGraphPercent

  //pie graph variables and settings
  vm.labels = ["Keep up the great work to earn your allowance!", "Completed Chores.  Great Job!"];
  //Make sure to use color codes, instead of color name for pie graph
  vm.colorsPie = ['#DC143C', '#008000'];
  vm.optionsPie = {
        legend: { display: true },
        responsive: true,  // set to false to remove responsiveness. Default responsive value is true.
        scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }]
        }
    };
  //pie graph alerts
  vm.clickme = function($event){
      alert($event[0]._view.label);
  };
}]);//end of UserController
