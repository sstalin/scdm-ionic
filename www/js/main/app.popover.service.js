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

