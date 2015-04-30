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