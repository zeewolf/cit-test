'use strict';

angular.module('citFullstackApp')
  .controller('MainCtrl', function ($scope, $http, $state, socket) {
    $scope.awesomeThings = [];
    $scope.awesomeAppeals = [];
    $scope.selectedAppeal = {};
    $scope.selectedThing = {};

    $scope.decisionList = ['Перезвоню', 'Принять', 'Отказать'];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/appeals').success(function(awesomeAppeals) {
      $scope.awesomeAppeals = awesomeAppeals;
      socket.syncUpdates('appeal', $scope.awesomeAppeals);
    });

    $scope.isMinisterApp = function(){
      var MINISTER_TYPE = 'minister';
      return $state.current.name === MINISTER_TYPE;
    }

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.editThing = function() {
      if($scope.selectedThing === {}) {
        return;
      }
      $http.patch('/api/things/' + $scope.selectedThing._id, $scope.selectedThing);
      $scope.selectedThing  = {};
    };

    $scope.setSelectedAppeal = function(appeal) {
      $scope.selectedAppeal = appeal;
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
      socket.unsyncUpdates('appeal');
    });

    $scope.addAppeal = function() {
      if($scope.newAppeal === '' || $scope.newAppeal === {}) {
        return;
      }
      $http.post('/api/appeals', $scope.newAppeal);
      $scope.newAppeal = {};
    };

    $scope.updateAppeal = function() {
      $http.patch('/api/appeals/' + $scope.selectedAppeal._id, $scope.selectedAppeal);
    };

    $scope.deleteAppeal = function(appeal) {
      $http.delete('/api/appeals/' + appeal._id);
    };

  });
