$(document).ready(function () {
  $('.navbar')
    .affix({
      offset: { top: 345 }
    })
    .on('affix-top.bs.affix', function (e) {
      $('body').css('background-position', '0 0');
    })
    .on('affix.bs.affix', function (e) {
      $('body').css('background-position', '0 70px');
    })
  ;
});

var app = angular.module('app', ['ngSanitize', 'ngRoute', 'ngAnimate', 'ngCookies']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/assets/templates/details.html'
    })
    .when('/bridalparty', {
      templateUrl: '/assets/templates/bridalparty.html'
    })
    .when('/ceremony', {
      templateUrl: '/assets/templates/ceremony.html'
    })
    .when('/reception', {
      templateUrl: '/assets/templates/reception.html'
    })
    .when('/travel', {
      templateUrl: '/assets/templates/travel.html'
    })
    .when('/rsvp', {
      templateUrl: '/assets/templates/rsvp.html',
      controller: 'RsvpController'
    })
    .when('/rsvp-edit', {
      templateUrl: '/assets/templates/rsvp-edit.html',
      controller: 'RsvpController'
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
    .otherwise({ redirectTo: '/' });
});

app.run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatRequireAuth = ['/guests', '/guest/:id'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    // if(_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
    //   $location.path('/login');
    //   FlashService.show("Please log in to continue.");
    // }
  });
});

app.factory("RsvpService", function($http) {
  return {
    get: function(code) {
      return $http.get('/rsvp/' + code);
    },
    set: function(code, data) {
      return $http.put('/rsvp/' + code, data);
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
    get: function() {
      return $http.get('/guests/:id');
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

  var cacheSession   = function() {
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

app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(function() {
      $location.path('/guests');
    });
  };
});

app.controller("RsvpController", function($scope, $rootScope, $location, RsvpService, SessionService) {
  $scope.help = "The code is on your invite. Capitalization doesn't matter.";
  $scope.danger = "";
  $scope.rsvp = SessionService.get('rsvp') || { code: '' };

  $scope.checkCode = function() {
    RsvpService.get($scope.rsvp.code)
      .success(function(response) {
        SessionService.set('rsvp', response[0]);
        $scope.rsvp = response[0];
        $scope.danger = "";
        $location.path('/rsvp-edit');
      })
      .error(function(response) {
        $scope.help = "";
        $scope.danger = response.text;
      });
  };
  $scope.addChild = function() {
    $scope.rsvp.children.push({'first':'','meal':''});
  };
  $scope.removeChild = function(child) {
    $scope.rsvp.children.splice($scope.rsvp.children.indexOf(child), 1);
  };
  $scope.respond = function() {
    RsvpService.set($scope.rsvp.code, $scope.rsvp)
      .success(function(response) {
        SessionService.set('rsvp', $scope.rsvp);
        $scope.danger = "";
        $scope.success = response.text;
      })
      .error(function(response) {
        $scope.danger = response.text;
        $scope.success = "";
      });
  }
});

app.controller("GuestsController", function($scope, $location, AuthenticationService, guests) {
  $scope.guests = guests.data;

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