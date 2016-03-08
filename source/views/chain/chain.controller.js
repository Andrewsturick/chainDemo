angular.module('optionChainDemo')
       .controller('ChainCtrl', function($scope, $state, $firebaseObject ){
         $scope.currentSymbol = $state.params.stockSymbol
           $scope.chainRef = new Firebase('https://rooftoptrading.firebaseio.com/market/' + $scope.currentSymbol + '/currentChains')
           $scope.data = $firebaseObject($scope.chainRef)


       })
