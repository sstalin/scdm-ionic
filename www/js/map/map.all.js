(function () {
    'use strict';
    angular.module('map', ['map.google', 'map.esri']);
})();

(function(){
    angular.module('map').controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$scope', 'GoogleMap', 'EsriMap', 'AppModal', 'AppPopover'];

    function MapCtrl($scope, GoogleMap, EsriMap, AppModal, AppPopover) {
        var map;

        $scope.search = LocationSearch;
        $scope.modal_close = AppModal.hide;
        $scope.map_mode = {map: 'Esri'};
        $scope.$watch('map_mode.map', function (mode) {
            var google_loaded;
            if (mode === 'Esri') {
                document.getElementById('map').firstChild.style.display = 'none';
                if (EsriMap.esriMapConstructor) {
                    map = EsriMap.createMap();
                } else {
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
                try {
                    google_loaded = google.maps ? true : false;
                } catch (e) {
                    console.log(e);
                }

                if (google_loaded) {
                    console.log("Google Map instance exist");
                } else {
                    map = GoogleMap.load();
                }

            }
        });

        /**
         * Opens search popover
         * @constructor
         */
        function LocationSearch($event) {
            var popover = AppPopover.create('templates/search-popover.html', $scope, $event);
        }
    }
})();

(function(){
    angular.module('map.esri', [])
        .service('EsriMap', EsriMap);

    function EsriMap() {
        var self = this;
        this.map = null;
        this.options = {
            center: [-87.049, 42.485],
            zoom: 2,
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

        this.createMap = function (options) {
            var opt = options || this.options;
            if (this.esriMapConstructor) {
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
    angular.module('map.google', [])
        .service('GoogleMap', GoogleMap);

    function GoogleMap() {
        this.map = {};
        this.options = {
            center: {lat: 42.485, lng: -87.049}, //default to chicago
            zoom: 2
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
})();
