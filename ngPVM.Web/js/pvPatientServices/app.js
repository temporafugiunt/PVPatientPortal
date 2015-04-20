'use strict';

// Declare app level module for the particula
var currentApp = angular.module('pvPatientServices', [ 'pvCommon' ])
    .config(function ($routeProvider, pvResourcesProvider) {
        $routeProvider.when('/patientSearch', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvPatientServices/patientSearch.html'),
            controller: 'pvPatientSearchController'
        });
        
        $routeProvider.when('/myInfo', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvPatientServices/myInfo.html'),
            controller: 'pvMyInfoController'
        });

        $routeProvider.otherwise({ redirectTo: '/patientSearch' });
    });
