angular.module('optionChainDemo')
      .directive('optionChain', function($firebaseArray, $state){
        return {
          scope: {
            chainData : "@"
          },
          templateUrl: "views/chain/optionChain.html",
          link: function(scope, el, attrs){
            scope.symbol = $state.params.stockSymbol

            scope.$watch(function(){return attrs.chainData}, function(n,o){
              scope.chainData = angular.fromJson(n)
              console.log('change!');
              if(n){
                if(scope.chainData['2016-03-18']){
                  for(var exp in scope.chainData){
                    try{
                      var chain = []
                      for(strike in scope.chainData[exp].chain){
                        chain.push(scope.chainData[exp].chain[strike])
                      }
                      scope.chainData[exp].chain = chain
                      scope.expirations = Object.keys(scope.chainData)
                      scope.expirations.splice(0,2)
                      scope.chainsLoaded = true;

                      if(scope.currentlyDisplayingChain){
                        scope.currentlyDisplayingChain = scope.chainData[scope.isDisplayingThisExpiration].chain
                      }
                    } catch(e){}
                  }
                }
              }
            })

          $('body').on('click', '.dropdown',showUL)

          function showUL(e){
             $(e.target).closest('th').find('.dropdown-menu').toggle()
          }

          scope.displayThisExpiration = function(exp){
            scope.isDisplayingThisExpiration = exp;
            scope.currentlyDisplayingChain = scope.chainData[exp].chain
          }

          scope.Math = window.Math
          scope.dataShown = [{title:"Open Interest", key:"open_interest"}, {title:"High", key: "high"}]


          scope.addToDataShown = function(index, data, type){
            type=="call" ? insertRegular() : insertReverse()
            function insertRegular(){
                scope.dataShown.splice(index, 1, {title: data, key: scope.Objectify(data)})
            }
            function insertReverse(){
                scope.dataShown.splice(scope.dataShown.length -1 -index, 1, {title: data, key: scope.Objectify(data)});
            }
          }

          scope.headers = {
            greeks: ["Delta", "Theta", "Vega", "Gamma"],
            price: ["High", "Low" ],
            volatility: ["IV"],
            expiration: "Expiration"
          }



          scope.Objectify = function(title){
            return title.toLowerCase().replace(' ',"_")
           }
          }
        }
      })
