app
  .controller("MainCtrl", function($scope, $ionicModal){
    $ionicModal.fromTemplateUrl('js/modals/help-modal.html', function(modal){
      $scope.helpModal = modal;
    }, {
      scope:$scope,
      animation:'slide-in-up'
    });

    $scope.showHelp = function(){
      $scope.helpModal.show();
    }

    $scope.closeHelp = function(){
      $scope.helpModal.hide();
    }

  
  });