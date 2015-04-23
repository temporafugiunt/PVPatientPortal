'use strict';

commonApp.directive('pvTopNavbar', function (pvResources) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: pvResources.addWebsiteBasePath('/partials/pvCommon/directives/pvTopNavbar.html'),
        controller: 'pvActiveUserMenuController',
    };
});
