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
