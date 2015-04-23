'use strict';

// Declare app level module for the particula
var currentApp = angular.module('pvPatientServices', [ 'pvCommon' ])
    .config(function ($routeProvider, pvResourcesProvider) {
        $routeProvider.when('/apiTester', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvPatientServices/apiTester.html'),
            controller: 'pvApiTesterController'
        });
        
        $routeProvider.when('/myInfo', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvPatientServices/myInfo.html'),
            controller: 'pvMyInfoController'
        });

        $routeProvider.when('/providerInfo', {
          templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvPatientServices/providerInfo.html'),
          controller: 'pvProviderInfoController'
        });

        $routeProvider.otherwise({ redirectTo: '/myInfo' });
    });
