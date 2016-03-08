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

angular.module('optionChainDemo')
       .controller('ChainCtrl', function($scope, $state, $firebaseObject ){
         $scope.currentSymbol = $state.params.stockSymbol
           $scope.chainRef = new Firebase('https://rooftoptrading.firebaseio.com/market/' + $scope.currentSymbol + '/currentChains')
           $scope.data = $firebaseObject($scope.chainRef)


       })

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

'use strict'
angular.module('optionChainDemo')
      .controller('HomeCtrl', function($scope, $firebaseArray, marketArray, $state){
        $scope.marketArray = marketArray;


        $scope.showChain = function(symbol){
          $state.go('chain.view',{stockSymbol:symbol})
        }
      })

angular.module('optionChainDemo')



      .factory('marketArray', function(){
        return  [
           {
             Symbol: "MMM",
             Name: "3M Co",
             Sector: "Industrials"
           },
           {
             Symbol: "ADBE",
             Name: "Adobe Systems",
             Sector: "Information Technology"
           },
           {
             Symbol: "AET",
             Name: "Aetna",
             Sector: "Health Care"
           },
           {
             Symbol: "AFL",
             Name: "AFLAC",
             Sector: "Financials"
           },
           {
           Symbol: "GAS",
           Name: "AGL Resources",
           Sector: "Utilities"
           },
           {
           Symbol: "ARG",
           Name: "Airgas",
           Sector: "Materials"
           },
           {
           Symbol: "ALL",
           Name: "Allstate Corp",
           Sector: "Financials"
           },
           {
           Symbol: "AGN",
           Name: "Allergan plc",
           Sector: "Health Care"
           },
           {
           Symbol: "AMZN",
           Name: "Amazon.com",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "AAL",
           Name: "American Airlines Group",
           Sector: "Airlines"
           },
           {
           Symbol: "AEP",
           Name: "American Electric Power",
           Sector: "Utilities"
           },
           {
           Symbol: "AXP",
           Name: "American Express",
           Sector: "Financials"
           },
           {
           Symbol: "AIG",
           Name: "American International Group",
           Sector: "Financials"
           },
           {
           Symbol: "ANTM",
           Name: "Anthem",
           Sector: "Health Care"
           },
           {
           Symbol: "APA",
           Name: "Apache Corp",
           Sector: "Energy"
           },
           {
           Symbol: "AIV",
           Name: "Apartment Investment & Mgmt",
           Sector: "Financials"
           },
           {
           Symbol: "T",
           Name: "AT&T",
           Sector: "Telecommunication Services"
           },
           {
           Symbol: "AAPL",
           Name: "Apple",
           Sector: "Information Technology"
           },
           {
           Symbol: "ADSK",
           Name: "Autodesk",
           Sector: "Information Technology"
           },
           {
           Symbol: "ADP",
           Name: "Automatic Data Processing",
           Sector: "Information Technology"
           },
           {
           Symbol: "AMZN",
           Name: "Amazon inc",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "AN",
           Name: "AutoNation",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "AZO",
           Name: "AutoZone",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "WTI",
           Name: "West Texas Offshore",
           Sector: "Energy"
           },
           {
           Symbol: "AVGO",
           Name: "Avago Technologies",
           Sector: "Information Technology"
           },
           {
           Symbol: "BAC",
           Name: "Bank of America",
           Sector: "Financials"
           },
           {
           Symbol: "BABA",
           Name: "Ali Baba",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "BIDU",
           Name: "Wynn Resorts",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "BBT",
           Name: "BB&T Corp",
           Sector: "Financials"
           },
           {
           Symbol: "BBBY",
           Name: "Bed Bath & Beyond",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "BRK-B",
           Name: "Berkshire Hathaway",
           Sector: "Financials"
           },
           {
           Symbol: "BBY",
           Name: "Best Buy",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "BIIB",
           Name: "Biogen",
           Sector: "Health Care"
           },
           {
           Symbol: "BLK",
           Name: "BlackRock",
           Sector: "Financials"
           },
           {
           Symbol: "BA",
           Name: "Boeing Co",
           Sector: "Industrials"
           },
           {
           Symbol: "BMY",
           Name: "Bristol-Myers Squibb",
           Sector: "Health Care"
           },
           {
           Symbol: "COG",
           Name: "Cabot Oil & Gas",
           Sector: "Energy"
           },
           {
           Symbol: "CAM",
           Name: "Cameron International",
           Sector: "Energy"
           },
           {
           Symbol: "CPB",
           Name: "Campbell Soup",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "COF",
           Name: "Capital One Financial",
           Sector: "Financials"
           },
           {
           Symbol: "CAT",
           Name: "Caterpillar",
           Sector: "Industrials"
           },
           {
           Symbol: "CBS",
           Name: "CBS Corp",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "CTL",
           Name: "CenturyLink",
           Sector: "Telecommunication Services"
           },
           {
           Symbol: "CHK",
           Name: "Chesapeake Energy",
           Sector: "Energy"
           },
           {
           Symbol: "CVX",
           Name: "Chevron Corp",
           Sector: "Energy"
           },
           {
           Symbol: "CMG",
           Name: "Chipotle Mexican Grill",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "CSCO",
           Name: "Cisco Systems",
           Sector: "Information Technology"
           },
           {
           Symbol: "C",
           Name: "Citigroup",
           Sector: "Financials"
           },
           {
           Symbol: "CTXS",
           Name: "Citrix Systems",
           Sector: "Information Technology"
           },
           {
           Symbol: "CLX",
           Name: "Clorox Co",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "CME",
           Name: "CME Group",
           Sector: "Financials"
           },
           {
           Symbol: "CMS",
           Name: "CMS Energy",
           Sector: "Utilities"
           },
           {
           Symbol: "KO",
           Name: "Coca-Cola Co",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "CL",
           Name: "Colgate-Palmolive",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "CMCSA",
           Name: "Comcast Corp",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "CAG",
           Name: "ConAgra Foods",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "COP",
           Name: "ConocoPhillips",
           Sector: "Energy"
           },
           {
           Symbol: "CSX",
           Name: "CSX Corp",
           Sector: "Industrials"
           },
           {
           Symbol: "COST",
           Name: "Costco Wholesale",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "CVS",
           Name: "CVS Health Corp",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "DAL",
           Name: "Delta Air Lines",
           Sector: "Industrials"
           },
           {
           Symbol: "DTV",
           Name: "DIRECTV",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "DG",
           Name: "Dollar General",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "DLTR",
           Name: "Dollar Tree",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "DPS",
           Name: "Dr. Pepper Snapple Group",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "DTE",
           Name: "DTE Energy",
           Sector: "Utilities"
           },
           {
           Symbol: "DD",
           Name: "Du Pont (E.I.)",
           Sector: "Materials"
           },
           {
           Symbol: "DUK",
           Name: "Duke Energy",
           Sector: "Utilities"
           },
           {
           Symbol: "ETFC",
           Name: "E Trade Financial",
           Sector: "Financials"
           },
           {
           Symbol: "EBAY",
           Name: "eBay",
           Sector: "Information Technology"
           },
           {
           Symbol: "FB",
           Name: "Facebook Cl",
           Sector: "Information Technology"
           },
           {
           Symbol: "EXPE",
           Name: "Expedia",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "FDX",
           Name: "FedEx Corp",
           Sector: "Industrials"
           },
           {
           Symbol: "F",
           Name: "Ford Motor",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "FOSL",
           Name: "Fossil Group",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "GM",
           Name: "General Motors",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "GIS",
           Name: "Genl Mills",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "GS",
           Name: "Goldman Sachs Group",
           Sector: "Financials"
           },
           {
           Symbol: "GT",
           Name: "Goodyear Tire & Rub",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "GOOGL",
           Name: "Google",
           Sector: "Information Technology"
           },
           {
           Symbol: "HRB",
           Name: "H & R Block",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "HAL",
           Name: "Halliburton Co",
           Sector: "Energy"
           },
           {
           Symbol: "HBI",
           Name: "Hanesbrands",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "HOG",
           Name: "Harley-Davidson",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "HSY",
           Name: "Hershey Co",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "HES",
           Name: "Hess Corp",
           Sector: "Energy"
           },
           {
           Symbol: "HPQ",
           Name: "Hewlett-Packard",
           Sector: "Information Technology"
           },
           {
           Symbol: "HD",
           Name: "Home Depot",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "HON",
           Name: "Honeywell International",
           Sector: "Industrials"
           },
           {
           Symbol: "HUM",
           Name: "Humana",
           Sector: "Health Care"
           },
           {
           Symbol: "IBM",
           Name: "International Bus. Machines",
           Sector: "Information Technology"
           },
           {
           Symbol: "IVZ",
           Name: "INVESCO Ltd",
           Sector: "Financials"
           },
           {
           Symbol: "JOY",
           Name: "Joy Global",
           Sector: "Industrials"
           },
           {
           Symbol: "JPM",
           Name: "JPMorgan Chase & Co",
           Sector: "Financials"
           },
           {
           Symbol: "K",
           Name: "Kellogg Co",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "GMCR",
           Name: "Keurig Green Mountain",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "KEY",
           Name: "KeyCorp",
           Sector: "Financials"
           },
           {
           Symbol: "KMB",
           Name: "Kimberly-Clark",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "KMI",
           Name: "Kinder Morgan",
           Sector: "Energy"
           },
           {
           Symbol: "KRFT",
           Name: "Kraft Foods Group",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "KR",
           Name: "Kroger Co",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "LOW",
           Name: "Lowe'sCompanies",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "LMT",
           Name: "Lockheed Martin",
           Sector: "Industrials"
           },
           {
           Symbol: "M",
           Name: "Macy's",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "MA",
           Name: "MasterCard",
           Sector: "Information Technology"
           },
           {
           Symbol: "MSFT",
           Name: "Microsoft Corp",
           Sector: "Information Technology"
           },
           {
           Symbol: "MRK",
           Name: "Merck & Co",
           Sector: "Health Care"
           },
           {
           Symbol: "MET",
           Name: "MetLife",
           Sector: "Financials"
           },
           {
           Symbol: "KORS",
           Name: "Michael Kors Holdings",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "MCHP",
           Name: "Microchip Technology",
           Sector: "Information Technology"
           },
           {
           Symbol: "MON",
           Name: "Monsanto Co",
           Sector: "Materials"
           },
           {
           Symbol: "TAP",
           Name: "Molson Coors Brewing",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "NFLX",
           Name: "NetFlix",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "NKE",
           Name: "NIKE",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "NE",
           Name: "Noble Corp",
           Sector: "Energy"
           },
           {
           Symbol: "ORCL",
           Name: "Oracle Corp",
           Sector: "Information Technology"
           },
           {
           Symbol: "PEP",
           Name: "PepsiCo",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "PFE",
           Name: "Pfizer",
           Sector: "Health Care"
           },
           {
           Symbol: "PM",
           Name: "Philip Morris International",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "PSX",
           Name: "Phillips 66",
           Sector: "Energy"
           },
           {
           Symbol: "PCLN",
           Name: "Priceline Group (The)",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "PRU",
           Name: "Prudential Financial",
           Sector: "Financials"
           },
           {
           Symbol: "PSA",
           Name: "Public Storage",
           Sector: "Financials"
           },
           {
           Symbol: "DGX",
           Name: "Quest Diagnostics",
           Sector: "Health Care"
           },
           {
           Symbol: "RL",
           Name: "Ralph Lauren Corp",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "QCOM",
           Name: "QUALCOMM",
           Sector: "Information Technology"
           },
           {
           Symbol: "RHI",
           Name: "Robert Half International",
           Sector: "Industrials"
           },
           {
           Symbol: "SNDK",
           Name: "SanDisk Corp",
           Sector: "Information Technology"
           },
           {
           Symbol: "RCL",
           Name: "Royal Caribbean Cruises",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "SCHW",
           Name: "Schwab(Charles)Corp",
           Sector: "Financials"
           },
           {
           Symbol: "LUV",
           Name: "Southwest Airlines",
           Sector: "Airlines"
           },
           {
           Symbol: "SPLS",
           Name: "Staples",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "SBUX",
           Name: "Starbucks Corp",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "STI",
           Name: "SunTrust Banks",
           Sector: "Financials"
           },
           {
           Symbol: "TGT",
           Name: "Target Corp",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "TXN",
           Name: "Texas Instruments",
           Sector: "Information Technology"
           },
           {
           Symbol: "TWC",
           Name: "Time Warner Cable",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "UA",
           Name: "Under Armour",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "UNH",
           Name: "UnitedHealth Group",
           Sector: "Health Care"
           },
           {
           Symbol: "VLO",
           Name: "Valero Energy",
           Sector: "Energy"
           },
           {
           Symbol: "VRSN",
           Name: "VeriSign",
           Sector: "Information Technology"
           },
           {
           Symbol: "VZ",
           Name: "Verizon Communications",
           Sector: "Telecommunication Services"
           },
           {
           Symbol: "VRTX",
           Name: "Vertex Pharmaceuticals",
           Sector: "Health Care"
           },
           {
           Symbol: "WMT",
           Name: "Wal-Mart Stores",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "WBA",
           Name: "Walgreens Boots Alliance",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "V",
           Name: "Visa",
           Sector: "Information Technology"
           },
           {
           Symbol: "VIAB",
           Name: "Viacom",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "DIS",
           Name: "Walt Disney Co",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "WM",
           Name: "Waste Management",
           Sector: "Industrials"
           },
           {
           Symbol: "WFM",
           Name: "Whole Foods Market",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "WFC",
           Name: "Wells Fargo",
           Sector: "Financials"
           },
           {
           Symbol: "WYNN",
           Name: "Wynn Resorts",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "LNKD",
           Name: "Linked in",
           Sector: "Information Technology"
           },
           {
           Symbol: "TSLA",
           Name: "Tesla co",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "TWTR",
           Name: "Twitter Inc Co",
           Sector: "Information Technology"
           },
           {
           Symbol: "GOOG",
           Name: "Alphabet Co",
           Sector: "Information Technology"
           },
           {
           Symbol: "P",
           Name: "Pandora",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "LULU",
           Name: "Lulu Lemon",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "XEL",
           Name: "Xcel Energy",
           Sector: "Utilities"
           },
           {
           Symbol: "XRX",
           Name: "Xerox Corp",
           Sector: "Information Technology"
           },
           {
           Symbol: "YHOO",
           Name: "Yahoo",
           Sector: "Information Technology"
           },
           {
           Symbol: "SYY",
           Name: "Sysco Corp",
           Sector: "Consumer Staples"
           },
           {
           Symbol: "YUM",
           Name: "Yum Brands",
           Sector: "Consumer Discretionary"
           },
           {
           Symbol: "TLT",
           Name: "20+ YR Treasury Bond ETF",
           Sector: "ETF"
           },
           {
           Symbol: "TBT",
           Name: "ProShares Trust UltraShort 20+ YR Treasury Bond ETF",
           Sector: "ETF"
           },
           {
           Symbol: "GLD",
           Name: "SPDR Gold ETF",
           Sector: "ETF"
           },
           {
           Symbol: "SLV",
           Name: "iShares Silver Trust ETF",
           Sector: "ETF"
           },
           {
           Symbol: "VIX",
           Name: "CBOE Market Volatility Index",
           Sector: "ETF"
           },
           {
           Symbol: "SPY",
           Name: "SPDR Trust S&P 500 ETF",
           Sector: "ETF"
           },
           {
           Symbol: "QQQ",
           Name: "PowerShares QQQ",
           Sector: "ETF"
           },
           {
           Symbol: "IWM",
           Name: "iShares Russell 2000 ETF",
           Sector: "ETF"
           },
           {
           Symbol: "DIA",
           Name: "SPDR Dow Jones Industrial Average ETF",
           Sector: "ETF"
           },
           {
           Symbol: "USO",
           Name: "United States Oil Fund ETF",
           Sector: "ETF"
           },
           {
           Symbol: "FXI",
           Name: "China Large Cap ETF",
           Sector: "Currency ETF"
           },
           {
           Symbol: "FXE",
           Name: "CurencyShares Euro Trust ETF",
           Sector: "Currency ETF"
           },
           {
           Symbol: "FXB",
           Name: "British Pound Sterling ETF",
           Sector: "Currency ETF"
           },
           {
           Symbol: "UUP",
           Name: "American Dollar ETF",
           Sector: "Currency ETF"
           }
           ]
      })
