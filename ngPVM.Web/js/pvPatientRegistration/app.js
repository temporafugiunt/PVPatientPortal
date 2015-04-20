'use strict';

// Declare app level module for the particula
var currentApp = angular.module('pvPatientRegistration', [ 'pvCommon' ])
    .config(function ($routeProvider, pvResourcesProvider) {
        $routeProvider.when('/patientSearch', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvPatientRegistration/patientSearch.html'),
            controller: 'pvPatientSearchController'
        });
        
        $routeProvider.when('/registerPatient', {
            templateUrl: pvResourcesProvider.addWebsiteBasePath('partials/pvPatientRegistration/registerPatient.html'),
            controller: 'pvPatientRegistrationController'
        });

        $routeProvider.otherwise({ redirectTo: '/patientSearch' });
    });
