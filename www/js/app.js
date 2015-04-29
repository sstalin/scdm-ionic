// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'map', 'about', 'account'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the starter can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.about', {
                url: '/about',
                views: {
                    'tab-about': {
                        templateUrl: 'templates/tab-about.html',
                        controller: 'AboutCtrl'
                    }
                }
            })

            .state('tab.map', {
                url: '/map',
                views: {
                    'tab-map': {
                        templateUrl: 'templates/tab-map.html',
                        controller: 'MapCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/about');

    });

(function () {
    "use strict";

    angular.module('about', [])
        .controller('AboutCtrl', AboutCtrl);

    function AboutCtrl(){

    }
})();

(function () {
    'use strict';
    angular.module('map', [])
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'GoogleMap', 'EsriMap'];

    function MapCtrl($scope, GoogleMap, EsriMap) {
        var map;

        $scope.map_mode = {map: 'Esri'};

        $scope.$watch('map_mode.map', function (mode) {
            var google_loaded;
            if (mode === 'Esri') {
                document.getElementById('map').firstChild.style.display = 'none';
                if(EsriMap.esriMapConstructor){
                    map = EsriMap.createMap();
                }else{
                    map = EsriMap.load();
                }

            }
            if (mode === 'Google') {
                if (EsriMap.map) {
                    delete EsriMap.options.center;
                    EsriMap.options.extent = EsriMap.map.extent;
                    EsriMap.destroy();
                    document.getElementById('map').firstChild.style.display = 'block';
                }
                try{
                    google_loaded = google.maps ? true : false;
                }catch (e){
                    console.log(e);
                }

                if(google_loaded){
                    console.log("Google Map instance exist");
                }else{
                    map = GoogleMap.load();
                }

            }
        });
    }
})();

(function () {
    'use strict';

    angular.module('map')
        .service('GoogleMap', GoogleMap)
        .service('EsriMap', EsriMap);

    function GoogleMap() {
        this.map = {};
        this.options = {
            center: {lat: 42.485, lng: -87.049}, //default to chicago
            zoom: 8
        };
        this.load = function () {
            require({
                    baseUrl: 'js/map'
                },
                ['map/google.map'],
                function (log) {
                    if (log.length > 0) {
                        console.log(log);
                    }
                });
            return this.map;
        };

        this.createMap = function (options) {
            var opt = options || this.options;
            this.map = new google.maps.Map(document.getElementById('map'),
                opt);
            return this.map;
        };
    }

    function EsriMap() {
        var self = this;
        this.map = null;
        this.options = {
            center: [-87.049, 42.485],
            zoom: 7,
            basemap: "streets",
            scroll: true
        };
        this.esriMapConstructor = null;
        this.load = function () {
            var map;
            require(["esri/map", "dojo/domReady!"], function (Map) {
                self.esriMapConstructor = Map;
                map = self.createMap();
                console.log("Esri Map loaded");
            });
            return map;
        };

        this.createMap = function(options){
            var opt = options || this.options;
            if(this.esriMapConstructor){
                this.map = this.esriMapConstructor('map', opt);
                console.log("Esri Map new instance created");
            }
            return this.map;
        };

        this.destroy = function () {
            if (this.map) {
                this.map.destroy();
            }
        };


    }

})();

(function(){
    'use strict';

    angular.module('account', [])
        .controller('AccountCtrl', AccountCtrl);

    function AccountCtrl(){

    }
})();
