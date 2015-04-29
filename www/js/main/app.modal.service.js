(function () {
    'use strict';
    angular.module('app')
        .service('AppModal', AppModal);

    AppModal.$inject = ['$ionicModal'];

    function AppModal($ionicModal) {
        var self = this;
        this.create = createModal;
        this.modal = null;
        this.open = openModal;

        function openModal(){
            self.modal.show();
        }
        function createModal(template, scope) {
            $ionicModal.fromTemplateUrl(template, {
                scope: scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                this.modal = modal;
            });
        }
    }
})();
