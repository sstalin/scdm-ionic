define(["https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&callback=createGoogleMap"], function () {
    window.createGoogleMap = function () {

        var $injector = angular.injector(['ng', 'map', 'map.google']);

        if ($injector.has('GoogleMap')) {
            $injector.get('GoogleMap').createMap();
        }
    };

    return "Google Map module loaded";
});

