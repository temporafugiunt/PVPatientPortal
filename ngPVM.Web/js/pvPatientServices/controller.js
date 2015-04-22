'use strict';

currentApp.controller('pvMyInfoController',
  function pvMyInfoController($scope, $log, $route, pvResources, pvDataService, pvUserManager) {
    $log.info($route.current.controller + " executing.");

    $scope.patientAppointmentList = {};

    $scope.patientAppointmentList.practice = "TEST";

    $scope.patientAppointmentList.data = pvDataService.getPatientPortalAppointmentsForCurrentDate($scope.patientAppointmentList.practice, pvUserManager.getActiveUserPk());
    $scope.patientAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    $scope.asProperDateTime = function (dateTime) {
      if (angular.isDefined(dateTime)) {
        var momentDateTime = moment(dateTime);
        return momentDateTime.format("dddd, MMMM Do YYYY, h:mm:ss a");
      }
      return '';
    };

    $scope.getPatientAppointments = function () {
      $scope.patientAppointmentList.data = pvDataService.getPatientPortalAppointmentsForServiceDate($scope.patientAppointmentList.practice, pvUserManager.getActiveUserPk(), $scope.providerAppointmentList.serviceDate);
      $scope.patientAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    };

    $scope.connectToAppointment = function (appointment) {
      alert('Appointment ' + appointment.logDetailPk);
    };
  }
);

currentApp.controller('pvProviderInfoController',
  function pvMyInfoController($scope, $log, $route, pvResources, pvDataService, pvUserManager) {
    $log.info($route.current.controller + " executing.");

    $scope.providerAppointmentList = {};

    $scope.providerAppointmentList.practice = "TEST";

    $scope.providerAppointmentList.availableVirtualEncounterPatients = pvDataService.getProviderPortalCurrentPatientsForCurrentDate($scope.providerAppointmentList.practice, '');
    $scope.providerAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a Z");

    $scope.asProperDateTime = function (dateTime) {
      if (angular.isDefined(dateTime)) {
        var momentDateTime = moment(dateTime);
        return momentDateTime.format("dddd, MMMM Do YYYY, h:mm:ss a Z");
      }
      return '';
    };

    $scope.getProviderCurrentPatients = function () {
      $scope.providerAppointmentList.availableVirtualEncounterPatients = pvDataService.getProviderPortalCurrentPatientsForCurrentDate($scope.providerAppointmentList.practice, '');
      $scope.providerAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a Z");
    };

    $scope.connectToAppointment = function (appointment) {
      alert('Appointment ' + appointment.logDetailPk);
    };
  }
);

currentApp.controller('pvApiTesterController',
  function pvPatientSearchController($scope, $log, $route, pvResources, pvDataService, pvUserManager) {
    $log.info($route.current.controller + " executing.");

    $scope.logoImageSmall = pvResources.addWebsiteBasePath('/Content/Images/logo2.jpg');

    $scope.apiHost = pvResources.apiBaseURL();

    $scope.versionInformation = pvDataService.getVersionInformation();

    $scope.providerAppointmentList = {};

    $scope.providerAppointmentList.practice = "TEST";
    $scope.providerAppointmentList.clinic = "BELVIDERE";

    var currentDate = moment();
    $scope.providerAppointmentList.serviceDate = currentDate.format("MM/DD/YYYY");

    $scope.providerAppointmentList.availableVirtualEncounterPatients = pvDataService.getProviderPortalCurrentPatientsForCurrentDate($scope.providerAppointmentList.practice, $scope.providerAppointmentList.clinic);
    $scope.providerAppointmentList.lastOperationTime = currentDate.format("dddd, MMMM Do YYYY, h:mm:ss a Z");

    $scope.asProperDateTime = function (dateTime) {
      if (angular.isDefined(dateTime)) {
        var momentDateTime = moment(dateTime);
        return momentDateTime.format("dddd, MMMM Do YYYY, h:mm:ss a Z");
      }
      return '';
    };

    $scope.getProviderCurrentPatients = function () {
      $scope.providerAppointmentList.availableVirtualEncounterPatients = pvDataService.getProviderPortalCurrentPatientsForServiceDate($scope.providerAppointmentList.practice, $scope.providerAppointmentList.clinic, $scope.providerAppointmentList.serviceDate);
      $scope.providerAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a Z");
    };

    $scope.patientAppointmentList = {};

    $scope.patientAppointmentList.practice = "TEST";
    $scope.patientAppointmentList.serviceDate = currentDate.format("MM/DD/YYYY");

    $scope.patientAppointmentList.currentPatient = pvDataService.getPatientPortalAppointmentsForCurrentDate($scope.patientAppointmentList.practice, pvUserManager.getActiveUserPk());
    $scope.patientAppointmentList.lastOperationTime = currentDate.format("dddd, MMMM Do YYYY, h:mm:ss a Z");
    
    $scope.getPatientAppointments = function () {
      $scope.patientAppointmentList.currentPatient = pvDataService.getPatientPortalAppointmentsForServiceDate($scope.patientAppointmentList.practice, pvUserManager.getActiveUserPk(), $scope.providerAppointmentList.serviceDate);
      $scope.patientAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a Z");
    };
  }
);