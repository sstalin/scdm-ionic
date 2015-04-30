// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app.main' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.main.services' is found in services.js
// 'app.main.controllers' is found in controllers.js
angular.module('app.main', ['ionic', 'map', 'about', 'account'])

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
    'use strict';
    angular.module('app.main')
        .service('AppModal', AppModal);

    AppModal.$inject = ['$ionicModal'];

    function AppModal($ionicModal) {
        var self = this;
        this.create = createModal;
        this.modal = null;
        this.template = null;
        this.show = openModal;
        this.hide = closeModal;
        this.destroy = destroyModal;

        function openModal(){
            self.modal.show();
        }
        function closeModal(){
            self.modal.hide();
        }
        function destroyModal(){
            self.modal.remove();
            self.modal = null;
            self.template = null;
        }

        function createModal(template, scope) {
            if(self.template === template && self.modal !== null){
                self.show();
                return self.modal;
            }
            if(self.modal !== null){
               self.destroy();
            }

            $ionicModal.fromTemplateUrl(template, {
                scope: scope,
                animation: 'slide-in-up',
                focusFirstInput: true,
                backdropClickToClose:true,
                hardwareBackButtonClose:true
            }).then(function (modal) {
                self.modal = modal;
                self.template = template;
                self.show();
            });
            return self.modal;
        }
    }
})();

(function () {
    'use strict';
    angular.module('app.main')
        .service('AppPopover', AppPopover);

    AppPopover.$inject = ['$ionicPopover'];

    function AppPopover($ionicPopover) {
        var self = this;
        this.create = createPopover;
        this.popover = null;
        this.template = null;
        this.show = openPopover;
        this.hide = closePopover;
        this.destroy = destroyPopover;

        function openPopover($event){
            self.popover.show($event);
        }
        function closePopover(){
            self.popover.hide();
        }
        function destroyPopover(){
            self.popover.remove();
            self.popover = null;
            self.template = null;
        }

        function createPopover(template, scope, $event) {
            if(self.template === template && self.popover !== null){
                self.show($event);
                return self.popover;
            }
            if(self.popover !== null){
                self.destroy();
            }

            $ionicPopover.fromTemplateUrl(template, {
                scope: scope
            }).then(function (popover) {
                self.popover = popover;
                self.template = template;
                self.show($event);
            });
            return self.popover;
        }
    }
})();

