var app = angular.module('PupsApp', []);

app.config(function (animalProvider) {
  animalProvider.setAnimal('bear')
})

app.value('apiBase', 'http://placekitten.com/')

app.factory('kittenFactory', function(apiBase) {
  return {
    getKitten: function (w, h) {
      console.log('Running kitten factory');
      return apiBase + '/' + w + '/' + h;
    }
  }
})

app.service('kittenService', function (apiBase) {
  this.getKitten = function (w, h) {
    console.log('Running kitten service');
    return apiBase + '/' + w + '/' + h;
  }
})

app.provider('animal', function () {
  var animal = 'kitten'
  this.setAnimal = function (newAnimal) {
    animal = newAnimal
  }

  function Animaller() {
    this.getAnimal = function (w, h) {
      console.log('Running animal provider');
      return 'http://www.place' + animal + '.com/' + w + '/' + h;
    }
  }

  this.$get = function () {
    return new Animaller()
  }
})

var controller = app.controller('MainController', function (
    $scope, apiBase, kittenFactory, kittenService, animal) {
  // $scope.hero = 'http://placekitten.com/800/500'
  // $scope.hero = apiBase + '/800/500'
  // $scope.hero = kittenFactory.getKitten(800, 500)
  // $scope.hero = kittenService.getKitten(800, 500)
  $scope.hero = animal.getAnimal(800, 500)
})
