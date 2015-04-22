'use strict';

// This management service provides the management layer for the Application's menu system.
commonApp.factory('pvMenuAndRouteManager',
    function ($q, $http, $log, $cacheFactory, $cookieStore, $location, pvResources, pvUserManager, pvDataService, $window, pvUtilityService) {
        var cache = $cacheFactory('pvMenuManagerCache');
        return {
            // Menu Functions
            //================================
            menuItemClick: function (menuItem, fullMenu) {
                var itemWasRouted = false;
                // Route the item if we can.
                if(this.canItemRoute(menuItem))
                {
                    if (!menuItem.isActive) {
                        this.goToRoute(menuItem, false, fullMenu);
                        itemWasRouted = true;
                    }
                }
                // Otherwise, if a main menu with submenu items then open it or close it.
                else if ((menuItem.showSubMenu) && (menuItem.subMenuItems.length > 0)) {
                    menuItem.isOpen = !menuItem.isOpen;
                    if (menuItem.isOpen) {
                        menuItem.isActive = true;
                    } else {
                        if (!this.hasActiveSubMenu(menuItem)) {
                            menuItem.isActive = false;
                        }
                    }
                }
                return itemWasRouted;
            },
            getActiveUserMenu: function () {
                var menu = this.getCacheValue('pvActiveUserMenu');

                //if (typeof menu != 'undefined') {
                //    // Add proper parent information to each submenu item.
                //    for (var i = 0; i < menu.length; i++) {
                //        var parent = menu[i];
                //        parent.parent = null;
                //        if (parent.subMenuItems) {
                //            for (var i2 = 0; i2 < parent.subMenuItems.length; i2++) {
                //                var child = parent.subMenuItems[i2];
                //                child.parent = parent;
                //            }
                //        }
                //    }
                //}
                return (menu);
            },
            hasActiveSubMenu: function (menuItem) {
                if (menuItem.showSubMenu) {
                    for (var i = 0; i < menuItem.subMenuItems.length; i++) {
                        var child = menuItem.subMenuItems[i];
                        if (child.isActive) {
                            return true;
                        }
                    }
                }
                return false;
            },
            unselectMenuItem: function (menuItem, fullMenu) {
                for (var i = 0; i < fullMenu.length; i++) {
                    var currentParent = fullMenu[i];
                    if (menuItem.menuId == currentParent.menuId) {
                        currentParent.isActive = false;
                        return true;
                    }
                    for (var i2 = 0; i2 < currentParent.subMenuItems.length; i2++) {
                        var child = currentParent.subMenuItems[i2];
                        if (menuItem.menuId == child.menuId) {
                            child.isActive = false;
                            return true;
                        }
                    }
                }
                return false;
            },
            selectMenuItem: function (menuItem, fullMenu) {
                for (var i = 0; i < fullMenu.length; i++) {
                    var currentParent = fullMenu[i];
                    if (menuItem.menuId == currentParent.menuId) {
                        currentParent.isActive = true;
                        return true;
                    }
                    for (var i2 = 0; i2 < currentParent.subMenuItems.length; i2++) {
                        var child = currentParent.subMenuItems[i2];
                        if (menuItem.menuId == child.menuId) {
                            child.isActive = true;
                            currentParent.isActive = true;
                            currentParent.isOpen = true;
                            return true;
                        }
                    }
                }
                return false;
            },
            closeUnusedMenus: function (fullMenu) {
                for (var i = 0; i < fullMenu.length; i++) {
                    var currentParent = fullMenu[i];
                    if((currentParent.isOpen) && (!this.hasActiveSubMenu(currentParent))) {
                        currentParent.isOpen = false;
                        currentParent.isActive = false;
                    }
                }
            },
            // Routing Functions
            //================================
            getLoginRoute: function() {
                return {
                    menuId: -1,
                    ngApp: 'pvLogin',
                    serverRoute: 'Login',
                    ngRoute: ''
                };
            },
            getActiveUserDefaultRoute: function () {
                return this.getCacheValue('pvActiveUserDefaultRoute');
            },
            isSameRoute: function (route1, route2) {
                route1 = pvUtilityService.standardizeRoute(route1);
                route2 = pvUtilityService.standardizeRoute(route2);
                return ((route1.ngApp == route2.ngApp) && (route1.ngRoute == route2.ngRoute) && (route1.serverRoute == route2.serverRoute));
            },
            getRouteFromCurrentPageData: function()
            {
                if (pvResources.activeNgApp && $location) {
                    var serverRoute = $location.absUrl();
                    var index = serverRoute.indexOf('#');
                    if (index != -1) {
                        serverRoute = serverRoute.substring(0, index);
                    }
                    index = serverRoute.lastIndexOf('/');
                    if (index != -1) {
                        serverRoute = serverRoute.substring(index + 1);
                    }

                    return {
                        ngApp: pvResources.activeNgApp,
                        serverRoute: serverRoute,
                        ngRoute: $location.path()
                    };
                }
            },
            canItemRoute: function (routeInfo) {
                if (this.isARoute(routeInfo)) {
                    if (routeInfo.ngApp != '') {
                        return true;
                    }
                    else if (routeInfo.serverRoute != '') {
                        return true;
                    }
                    return false;
                } 
                return false;
            },
            goToRoute: function (routeInfo, replaceInHistory, fullMenu) {
                // Are we a sub menu item or menu item or at least a route definition?
                if (this.isARoute(routeInfo)) {
                    // Is this an SPA route potentially or is it a guaranteed server page route?
                    var fullURL = '';
                    if (routeInfo.ngApp != '') {
                        this.saveActiveRouteUpdateMenu(routeInfo, replaceInHistory, fullMenu);
                        
                        // If a different ngApp then we need to server redirect.
                        if (routeInfo.ngApp != pvResources.activeNgApp) {
                            fullURL = pvResources.addWebsiteBasePath(routeInfo.serverRoute);
                            if (routeInfo.ngRoute != '') {
                                fullURL += '#/' + routeInfo.ngRoute;
                            }

                            if (replaceInHistory) {
                                $window.location.replace(fullURL);
                            } else {
                                $window.location.assign(fullURL);
                            }
                        } else {
                            if (routeInfo.ngRoute.charAt(0) != '/') {
                                fullURL = '/';
                            }
                            fullURL += routeInfo.ngRoute;
                            $location.path(fullURL);
                        }
                        // Not an angular route, are we server redirect.
                    } else if (routeInfo) {
                        this.saveActiveRouteUpdateMenu(routeInfo, replaceInHistory, fullMenu);
                        fullURL = pvResources.addWebsiteBasePath(serverRoute); // TODO: 'serverRoute' is not defined
                        if (replaceInHistory) {
                            $window.location.replace(fullURL);
                        } else {
                            $window.location.assign(fullURL);
                        }
                    } // <-- Don't route if we don't have routing information, this is purposeful for placeholder menu items.
                }
            },
            saveActiveRouteUpdateMenu: function (routeInfo, replaceInHistory, fullMenu) {
                var previousRoute = $cookieStore.get('pvActiveRoute');
                    
                if (replaceInHistory) {
                    if (typeof previousRoute != 'undefined') {
                        $cookieStore.put('pvPreviousRoute', previousRoute);
                    }
                }
                $cookieStore.put('pvActiveRoute', routeInfo);
                
                if (typeof fullMenu != 'undefined') {
                    // Reset menu items for route change if we are jumping from one menu item to another or we
                    // explicitly recieved a menu item 'reset' update (which is menuId = -1).
                    if (this.isAMenuItem(routeInfo)) {
                        if (this.isAMenuItem(previousRoute)) {
                            this.unselectMenuItem(previousRoute, fullMenu);
                        }
                        if (routeInfo.menuId != -1) {
                            this.selectMenuItem(routeInfo, fullMenu);
                        }
                        this.closeUnusedMenus(fullMenu);
                    }
                }
            },
            setMenuFromActiveRoute: function(fullMenu) {
                var activeRoute = this.getActiveRoute();
                if (this.isAMenuItem(activeRoute)) {
                    if (activeRoute.menuId != -1) {
                        this.selectMenuItem(activeRoute, fullMenu);
                    }
                }
            },
            getActiveRoute: function () {
                return $cookieStore.get('pvActiveRoute');
            },
            isARoute: function(routeInfo) {
                if ((typeof routeInfo != 'undefined') &&
                    (typeof routeInfo.ngApp != 'undefined') &&
                    (typeof routeInfo.serverRoute != 'undefined') &&
                    (typeof routeInfo.ngRoute != 'undefined')) {
                    return true;
                }
                return false;
            },
            isAMenuItem: function(menuInfo) {
                if ((typeof menuInfo != 'undefined') &&
                    (typeof menuInfo.menuId != 'undefined')) {
                    return true;
                }
                return false;
            },
            // Cache Functions
            //================================
            getCacheValue: function(key) {
                var value = cache.get(key);

                if (typeof value == 'undefined') {
                    this.cacheActiveUserSettings();
                }
                value = cache.get(key);
                return value;
            },
            cacheActiveUserSettings: function () {
                var activeUser = pvUserManager.getActiveUser();
                if (activeUser != '') {
                    cache.put('pvActiveUserMenu', pvDataService.getUserMenu(activeUser));
                    cache.put('pvActiveUserDefaultRoute', pvDataService.getUserDefaultRoute(activeUser));
                } else {
                    cache.put('pvActiveUserMenu', '');
                    cache.put('pvActiveUserDefaultRoute', '');
                }
            }
        };
    }
);
