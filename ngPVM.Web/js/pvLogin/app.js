'use strict';

// Declare app level module for the particula
var currentApp = angular.module('pvLogin', ['pvCommon'])
    .config(function ($routeProvider, pvResourcesProvider) {
        $routeProvider.when('/', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvLogin/login.html'),
            controller: 'pvLoginController'
        });
        
        $routeProvider.when('/changePassword', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvLogin/changePassword.html'),
            controller: 'pvLoginController'
        });
        
        $routeProvider.when('/passwordHint', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvLogin/passwordHint.html'),
            controller: 'pvLoginController'
        });

        $routeProvider.otherwise({ redirectTo: '/' });
    });
