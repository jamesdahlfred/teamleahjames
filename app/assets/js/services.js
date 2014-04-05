var services = angular.module('teamLeahJames.services', ['ngResource']);

services.factory('GuestsFactory', function ($resource) {
  return $resource('/services/guests', {}, {
    query: { method: 'GET', isArray: true },
    create: { method: 'POST' }
  })
});

services.factory('GuestFactory', function ($resource) {
  return $resource('/services/guests/:id', {}, {
    show: { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  })
});