
// Watch for changes to route and reset the menu system accordingly.
commonApp.run(function ($rootScope, $log, pvMenuAndRouteManager, pvResources, $location) {
    $rootScope.$on('$routeChangeSuccess', function (event, currentRoute, previousRoute) {
        if (pvResources.activeNgApp && $location) {
            $log.info("Route has changed to ng app " + pvResources.activeNgApp + " with path " + $location.path() + " and " + $location.absUrl() + ".");
        }
        // If we have gotten here outside of our routing system be prepared to reset routing parameters. 
        var activeUserMenuItems = pvMenuAndRouteManager.getActiveUserMenu();
        var pageAsRoute = pvMenuAndRouteManager.getRouteFromCurrentPageData();
        var storedActiveRoute = pvMenuAndRouteManager.getActiveRoute();
        if ((typeof storedActiveRoute == 'undefined') || (!pvMenuAndRouteManager.isSameRoute(pageAsRoute, storedActiveRoute))) {
            this.saveActiveRouteUpdateMenu(pageAsRoute, false, activeUserMenuItems);
        }
        // Since we changes the route, setup the active menu viewmodel properties correctly.
        else if(typeof activeUserMenuItems != 'undefined') {
            pvMenuAndRouteManager.setMenuFromActiveRoute(activeUserMenuItems);
        }
    });
});

// Watch for changes to user and reset the active route accordingly.
commonApp.run(function ($rootScope, $log, pvMenuAndRouteManager, pvResources, $window) {
    $rootScope.$on('pvActiveUserChanged', function (event, activeUser, previousUser) {
      $log.info("Active user changed to " + activeUser + " from " + previousUser);
        pvMenuAndRouteManager.cacheActiveUserSettings();
        if (activeUser != '') {
            pvMenuAndRouteManager.goToRoute(pvMenuAndRouteManager.getActiveUserDefaultRoute(), true);
        } else {
            pvMenuAndRouteManager.goToRoute(pvMenuAndRouteManager.getLoginRoute(), true);
        }
    });
});