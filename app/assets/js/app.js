// angular.module('teamLeahJames', ['teamLeahJames.filters', 'teamLeahJames.services', 'teamLeahJames.directives', 'teamLeahJames.controllers']).
//   config(['$routeProvider', function ($routeProvider) {
//       $routeProvider.when('/guest-list', {templateUrl: 'partials/guest-list.html', controller: 'GuestListCtrl'});
//       $routeProvider.when('/guest-detail/:id', {templateUrl: 'partials/guest-detail.html', controller: 'GuestDetailCtrl'});
//       $routeProvider.when('/guest-creation', {templateUrl: 'partials/guest-creation.html', controller: 'GuestCreationCtrl'});
//       $routeProvider.otherwise({redirectTo: '/guest-list'});
//   }]);

var app = angular.module("app", ['ngSanitize']);

app.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  });

  $routeProvider.when('/books', {
    templateUrl: 'templates/books.html',
    controller: 'BooksController',
    resolve: {
      books : function(BookService) {
        return BookService.get();
      }
    }
  });

  $routeProvider.otherwise({ redirectTo: '/login' });

});

