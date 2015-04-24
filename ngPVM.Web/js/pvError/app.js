'use strict';

// Declare app level module for the particula
var currentApp = angular.module('pvError', ['pvCommon'])
    .config(function ($routeProvider, pvResourcesProvider) {
        $routeProvider.when('/error404', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvError/error404.html')
        });
        $routeProvider.when('/error500', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvError/error500.html')
        });
        $routeProvider.otherwise({ redirectTo: '/error404' });
    });
