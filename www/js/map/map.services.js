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
