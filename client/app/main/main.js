'use strict';

angular.module('citFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('minister', {
        url: '/minister',
        templateUrl: 'app/main/minister.html',
        controller: 'MainCtrl'
      });
  });
