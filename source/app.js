angular.module('optionChainDemo', [
          'ui.router',
          'ui.bootstrap',
          'firebase',
          'angucomplete-alt'
          ])
      .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
          .state('index', {
            url: '/',
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl'
          })
          .state('chain', {
            url: '/chain',
            templateUrl: '/views/chain/layout.html',
            abstract: true
          })
          .state('chain.view', {
            url: '/{stockSymbol}',
            templateUrl: '/views/chain/viewChain.html',
            controller: 'ChainCtrl'
          })

        $urlRouterProvider.otherwise('/')
      })


      .filter('reverse', function(){
        return function(i){
         return i.slice().reverse();
        }
      })
