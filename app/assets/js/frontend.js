$(document).ready(function() {
  $('.navbar')
    .affix({ offset: { top: 250 } })
    .on('affix-top.bs.affix', function(e) { $('body').css('background-position', '0  0  '); })
    .on('affix.bs.affix'    , function(e) { $('body').css('background-position', '0 70px'); })
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
    .when('/gifts', {
      templateUrl: '/assets/templates/gifts.html'
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
    .otherwise({ redirectTo: '/' });
});

app.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
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

app.controller("RsvpController", function($scope, $location, RsvpService, SessionService) {
  $scope.help = "The code is on your invitation. Capitalization doesn't matter.";
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