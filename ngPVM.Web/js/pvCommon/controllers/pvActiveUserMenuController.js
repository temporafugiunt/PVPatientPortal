'use strict';

commonApp.controller('pvActiveUserMenuController',
    function pvActiveUserMenuController($scope, $log, pvUserManager, pvMenuAndRouteManager) {
        $scope.activeUser = pvUserManager.getActiveUser();
        $scope.activeUserMenuItems = pvMenuAndRouteManager.getActiveUserMenu();
        $scope.menuItemClick = function(menuItem) {
            pvMenuAndRouteManager.menuItemClick(menuItem, $scope.activeUserMenuItems);
        };
        $scope.logout = function() {
            pvUserManager.logout();
        };
    }
);