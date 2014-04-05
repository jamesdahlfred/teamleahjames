var app = angular.module('teamLeahJames.controllers', []);

app.controller('GuestListCtrl', ['$scope', 'GuestsFactory', 'GuestFactory', '$location', function ($scope, GuestsFactory, GuestFactory, $location) {

  // callback for ng-click 'editGuest':
  $scope.editGuest = function (guestId) {
    $location.path('/guest-detail/' + guestId);
  };

  // callback for ng-click 'deleteGuest':
  $scope.deleteGuest = function (guestId) {
    GuestFactory.delete({ id: guestId });
    $scope.guests = GuestsFactory.query();
  };

  // callback for ng-click 'createGuest':
  $scope.createNewGuest = function () {
    $location.path('/guest-creation');
  };

  $scope.guests = GuestsFactory.query();
}]);

app.controller('GuestDetailCtrl', ['$scope', '$routeParams', 'GuestFactory', '$location', function ($scope, $routeParams, GuestFactory, $location) {
  // callback for ng-click 'updateGuest':
  $scope.updateGuest = function () {
    GuestFactory.update($scope.guest);
    $location.path('/guest-list');
  };

  // callback for ng-click 'cancel':
  $scope.cancel = function () {
    $location.path('/guest-list');
  };

  $scope.guest = GuestFactory.show({id: $routeParams.id});
}]);

app.controller('GuestCreationCtrl', ['$scope', 'GuestsFactory', '$location', function ($scope, GuestsFactory, $location) {
  // callback for ng-click 'createNewGuest':
  $scope.createNewGuest = function () {
    GuestsFactory.create($scope.guest);
    $location.path('/guest-list');
  }
}]);