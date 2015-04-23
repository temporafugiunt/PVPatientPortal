'use strict';

commonApp.directive('pvSidebarMenu', function (pvResources) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: pvResources.addWebsiteBasePath('/partials/pvCommon/directives/pvSidebarMenu.html'),
        controller: 'pvActiveUserMenuController',
    };
});
