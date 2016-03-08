'use strict'
angular.module('optionChainDemo')
      .controller('HomeCtrl', function($scope, $firebaseArray, marketArray, $state){
        $scope.marketArray = marketArray;


        $scope.showChain = function(symbol){
          $state.go('chain.view',{stockSymbol:symbol})
        }
      })
