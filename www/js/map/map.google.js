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
