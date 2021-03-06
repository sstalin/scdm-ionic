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
