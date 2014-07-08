// $('body').on($.support.transition, '.reveal-animation', function(event){    
//     debugger;
//     $('#totals').affix({ offset: { top: 250 } });
// });

var app = angular.module('app', ['ngSanitize', 'ngRoute', 'ngAnimate', 'ngCookies']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '/assets/templates/login.html',
      controller: 'LoginController'
    })
    .when('/guests', {
      templateUrl: '/assets/templates/guests.html',
      controller: 'GuestsController',
      resolve: {
        guests: function(GuestsService) {
          return GuestsService.get();
        }
      }
    })
    .when('/guest/:id', {
      templateUrl: '/assets/templates/guest.html',
      controller: 'GuestController',
      resolve: {
        guest: function(GuestService) {
          return GuestService.get(id);
        }
      }
    })
    .otherwise({ redirectTo: '/login' });
});

app.config(function($httpProvider) {

  var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
    var success = function(response) {
      return response;
    };

    var error = function(response) {
      if(response.status === 401) {
        SessionService.unset('authenticated');
        $location.path('/login');
        FlashService.show(response.data.flash);
      }
      return $q.reject(response);
    };

    return function(promise) {
      return promise.then(success, error);
    };
  };

  $httpProvider.responseInterceptors.push(logsOutUserOn401);

});

app.run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatRequireAuth = ['/guests', '/guest/:id'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
      FlashService.show("Please log in to continue.");
    }
    $('.navbar-brand, .navbar a').each(function(i, el) {
      var fragment = $(el).attr('href');
      if (location.href.substr(location.href.indexOf(fragment)) == fragment) {
        $(el).parent().addClass('active');
      } else {
        $(el).parent().removeClass('active');
      }
    });
  });
});

app.factory("SessionService", function($cookieStore) {
  return {
    get: function(key) {
      if (Modernizr.sessionStorage) {
        return sessionStorage.getItem(key);
      } else {
        return $cookieStore.get(key);
      }
    },
    set: function(key, val) {
      if (Modernizr.sessionStorage) {
         return sessionStorage.setItem(key, val);
      } else {
        return $cookieStore.put(key, val);
      }
    },
    unset: function(key) {
      if (Modernizr.sessionStorage) {
        return sessionStorage.removeItem(key);
      } else {
        return $cookieStore.remove(key);
      }
    }
  }
});

app.factory("AuthenticationService", function($http, $sanitize, SessionService, FlashService, CSRF_TOKEN) {

  var cacheSession = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
      csrf_token: CSRF_TOKEN
    };
  };

  return {
    login: function(credentials) {
      var login = $http.post("/auth/login", sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },
    logout: function() {
      var logout = $http.get("/auth/logout");
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
});

app.factory("GuestsService", function($http) {
  return {
    get: function() {
      return $http.get('/guests');
    }
  };
});

app.factory("GuestService", function($http) {
  return {
    get: function(id) {
      return $http.get('/guests/' + id);
    },
    set: function(id, data) {
      return $http.put('/guests/' + id, data);
    }
  };
});

app.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});

app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(function() {
      $location.path('/guests');
    });
  };
});

app.controller("GuestsController", function($scope, $location, AuthenticationService, guests) {
  $scope.guestsA = _.where(guests.data, {list: 'A'});
  $scope.guestsB = _.where(guests.data, {list: 'B'});
  $scope.guestsC = _.where(guests.data, {list: 'C'});

  $scope.totalAccepted = 0;
  $scope.totalDeclined = 0;
  $scope.totalSent = 0;

  $scope.totalApps = 0;
  $scope.totalAdults = 0;
  $scope.totalChildren = 0;
  $scope.totalClams = 0;
  $scope.totalVegs = 0;

  _.each(guests.data, function(guest){
    guest.adults = 0;
    guest.pending = false;

    if (guest.invitation_sent == '1') {

      // People we actually sent a paper invitation
      $scope.totalSent += 1;
      guest.inivitaion_number = (guest.invitation_sent) ? $scope.totalSent : '';

      if (guest.responded == '1') {

        // They're coming! Assess their stats.
        if (guest.attending == '1') {
          $scope.totalAccepted++;
          $scope.totalAdults++;
          guest.adults = 1;          

          // Tick one in either column
          $scope.totalClams += (guest.guest.meal == 'S') ? 1 : 0;
          $scope.totalVegs  += (guest.guest.meal == 'V') ? 1 : 0;

          if (_.isObject(guest.plusone)) {
            $scope.totalAdults++;
            guest.adults++;

            // Tick one in either column
            $scope.totalClams += (guest.plusone.meal == 'S') ? 1 : 0;
            $scope.totalVegs  += (guest.plusone.meal == 'V') ? 1 : 0;
          }
          
          // Appetizer?
          $scope.totalApps += (guest.appetizer) ? 1 : 0;
          
          if (guest.children && guest.children > 0) {
            $scope.totalChildren += guest.children;
          } else {
            guest.children = '';
          }
        } else {

          // They're not coming.
          $scope.totalDeclined++;
        }
      } else {

        // They haven't responded.
        guest.pending = true;
      }

    } else {
      if (guest.responded == '1') {

        // People we directly added without an invite
        if (guest.attending == '1') {
          $scope.totalAdults++;
          guest.adults = 1;

          // Tick one in either column
          $scope.totalClams += (guest.guest.meal == 'S') ? 1 : 0;
          $scope.totalVegs  += (guest.guest.meal == 'V') ? 1 : 0;

          if (_.isObject(guest.plusone)) {
            $scope.totalAdults++;
            guest.adults++;

            // Tick one in either column
            $scope.totalClams += (guest.plusone.meal == 'S') ? 1 : 0;
            $scope.totalVegs  += (guest.plusone.meal == 'V') ? 1 : 0;
          }
          
          // Appetizer?
          $scope.totalApps += (guest.appetizer) ? 1 : 0;
          
          if (guest.children && guest.children > 0) {
            $scope.totalChildren += guest.children;
          } else {
            guest.children = '';
          }
        }
      } else {

        // Not invited at all, don't worry about them
      }


    }
  });

  $scope.logout = function() {
    AuthenticationService.logout().success(function() {
      $location.path('/login');
    });
  };
});

app.controller("GuestController", function($scope, $location, AuthenticationService, guest) {
  $scope.guest = guest.data;

  $scope.logout = function() {
    AuthenticationService.logout().success(function() {
      $location.path('/login');
    });
  };
});

app.factory("ContactService", function($http) {
  return {
    send: function(data) {
      return $http.post('/contact', data);
    }
  };
});

app.controller("ContactController", function($scope, ContactService) {
  $scope.contact = { name: "", email: "", note: "" };
  $scope.message = "";
  
  $scope.send = function() {
    ContactService.send($scope.contact)
      .success(function(response) {
        $scope.message = response.text;
      })
      .error(function(response) {
        $scope.message = response.text;
      });
  }
});

// function TodoCtrl($scope) {
//   $scope.todos = [
//     {text:'learn angular', done:true},
//     {text:'build an angular app', done:false}];
 
//   $scope.addTodo = function() {
//     $scope.todos.push({text:$scope.todoText, done:false});
//     $scope.todoText = '';
//   };
 
//   $scope.remaining = function() {
//     var count = 0;
//     angular.forEach($scope.todos, function(todo) {
//       count += todo.done ? 0 : 1;
//     });
//     return count;
//   };
 
//   $scope.archive = function() {
//     var oldTodos = $scope.todos;
//     $scope.todos = [];
//     angular.forEach(oldTodos, function(todo) {
//       if (!todo.done) $scope.todos.push(todo);
//     });
//   };
// }
