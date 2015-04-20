'use strict';

currentApp.controller('pvMyInfoController',
  function pvMyInfoController($scope, $log, $route, pvResources, pvDataService) {
    $log.info($route.current.controller + " executing.");

    $scope.logoImageSmall = pvResources.addWebsiteBasePath('/Content/Images/logo2.jpg');

    $scope.apiHost = pvResources.apiBaseURL();

    $scope.versionInformation = pvDataService.getVersionInformation();

    $scope.clientIP = pvDataService.getClientIP();
  }
);

currentApp.controller('pvPatientSearchController',
  function pvPatientSearchController($scope, $log, $route, pvResources, pvDataService) {
    $log.info($route.current.controller + " executing.");

    $scope.logoImageSmall = pvResources.addWebsiteBasePath('/Content/Images/logo2.jpg');

    $scope.apiHost = pvResources.apiBaseURL();

    $scope.versionInformation = pvDataService.getVersionInformation();

    $scope.currentPatientList = {};

    $scope.currentPatientList.practice = "TEST";
    $scope.currentPatientList.clinic = "BELVIDERE";

    var currentDate = moment();
    $scope.currentPatientList.serviceDate = currentDate.format("MM/DD/YYYY");

    $scope.currentPatientList.availableVirtualEncounterPatients = pvDataService.getPatientPortalCurrentPatientsForCurrentDate($scope.currentPatientList.practice, $scope.currentPatientList.clinic);
    $scope.currentPatientList.lastOperationTime = currentDate.format("dddd, MMMM Do YYYY, h:mm:ss a Z");

    $scope.asProperDateTime = function (dateTime) {
      if (angular.isDefined(dateTime)) {
        var momentDateTime = moment(dateTime);
        return momentDateTime.format("dddd, MMMM Do YYYY, h:mm:ss a Z");
      }
      return '';
    };

    $scope.getCurrentPatients = function () {
      $scope.currentPatientList.availableVirtualEncounterPatients = pvDataService.getPatientPortalCurrentPatientsForCurrentDate($scope.currentPatientList.practice, $scope.currentPatientList.clinic, $scope.currentPatientList.serviceDate);
      var currentDate = moment();
      $scope.currentPatientList.lastOperationTime = currentDate.format("dddd, MMMM Do YYYY, h:mm:ss a Z");
    };

    $scope.vitalsData =
    {
      practice: "TEST",
      dataType: { id: '' },
      serialNumber: "T12345VTLS"
    };

    $scope.imagesData =
    {
      practice: "TEST",
      serialNumber: "T12345IMGS",
      files: []
    };

    $scope.vitalsDataTypes = [
    {
      name: 'Temperature',
      id: 'temperature'
    },
    {
      name: 'Blood Pressure',
      id: 'bloodPressure'
    },
    {
      name: 'Respiration',
      id: 'respiratoryRate'
    },
    {
      name: 'SP02',
      id: 'spO2'
    },
    {
      name: 'Weight',
      id: 'weight'
    },
    {
      name: 'Height',
      id: 'height'
    },
    {
      name: "Pain Scale",
      id: 'painScale'
    }];

    $scope.temperatureLocations = [
    {
      name: 'Tympanic [L]'
    },
    {
      name: 'Tympanic [R]'
    },
    {
      name: 'Oral'
    },
    {
      name: 'Axillary [L]'
    },
    {
      name: 'Axillary [R]'
    },
    {
      name: 'Rectal'
    },
    {
      name: "Temporal"
    }];

    $scope.o2Deliveries = [
    {
      name: 'Room Air',
      id: 0
    },
    {
      name: 'Oxygen',
      id: 1
    }];

    $scope.o2Routes = [
    {
      name: 'Nasal Cannula'
    },
    {
      name: 'Venturi Mask'
    },
    {
      name: 'Non-rebreather Mask'
    },
    {
      name: 'Tracheostomy Mask'
    }];

    $scope.medPodData = {};
    $scope.medPodData.practice = "TEST";

    $scope.submitVitalsData = function () {
      var currentDate = new Date();
      var patientReadings = {
        practice: $scope.vitalsData.practice,
        logDetailPk: $scope.vitalsData.logDetailPk,
        timeZoneOffset: currentDate.getTimezoneOffset(),
        vitals: [{
          dataType: $scope.vitalsData.dataType.id,
          serialNumber: $scope.vitalsData.serialNumber,
          timeStamp: currentDate.getTime(),
          units: $scope.vitalsData.units,
          height: $scope.vitalsData.height,
          weight: $scope.vitalsData.weight,
          temperature: $scope.vitalsData.temperature,
          location: getTempLocation(),
          bpDiastolic: $scope.vitalsData.bpDiastolic,
          bpSystolic: $scope.vitalsData.bpSystolic,
          pulse: $scope.vitalsData.pulse,
          o2Saturation: $scope.vitalsData.o2Saturation,
          o2Delivery: getO2Delivery(),
          o2Rate: $scope.vitalsData.o2Rate,
          o2Route: getO2Route(),
          respirations: $scope.vitalsData.respirations,
          painScale: $scope.vitalsData.painScale
        }]
      };
      pvDataService.postVitalsData(patientReadings);
    };

    $scope.submitImageData = function () {

      var currentDate = new Date();
      var patientReadings = {
        practice: $scope.imagesData.practice,
        logDetailPk: $scope.imagesData.logDetailPk,
        timeZoneOffset: currentDate.getTimezoneOffset(),
        images: []
      };

      var reader = new FileReader();
      var file = $scope.imagesData.files[0];

      // Stupid asynchronous callback function that won't allow us to loop through a list of files to complete the operation...
      reader.onloadend = function () {
        var mediaTypeAndEncodingIdx = reader.result.search(',');
        var mediaTypeAndEncoding = reader.result.substr(0, mediaTypeAndEncodingIdx);
        var encodingIdx = mediaTypeAndEncoding.search(';');
        // ignore the "data:" portion of the URL.
        var mediaType = mediaTypeAndEncoding.substring(5, encodingIdx);
        var encoding = mediaTypeAndEncoding.substr(encodingIdx + 1);
        var name = file.name;
        if (name.lastIndexOf('.') != -1) {
          name = name.substr(0, name.lastIndexOf('.'));
        }

        var fileInfo = {
          name: name,
          mediaType: mediaType,
          encoding: encoding,
          data: reader.result.substr(mediaTypeAndEncodingIdx + 1),
          serialNumber: "123456789ABCD12345",
          timeStamp: currentDate.getTime(),
        };
        patientReadings.images.push(fileInfo);
        pvDataService.postVitalsData(patientReadings);
      }
      reader.readAsDataURL(file);
    };

    $scope.submitArbitraryPacket = function () {
      //var arbitraryPacket = {
      //  practice: "TEST",
      //  logDetailPk: "24b7f5c07ec2e411940000237d22cbbe",
      //  timeZoneOffset: 300,
      //  vitals:
      //  [
      //    {
      //      dataType: "weight",
      //      serialNumber: "D630",
      //      timeStamp: 1425510751000,
      //      units: "Lbs",
      //      weight: "81.6"
      //    }
      //  ]
      //};
      //
      //pvDataService.postVitalsData(arbitraryPacket);

      var arbitraryPacket = {
        practice: 'TEST',
        logDetailPk: 'a818f0a650c3e411940000237d22cbbe',
        medPodId: 'ARB12345'
      };
      pvDataService.authenticatedApiSend("/MedPod/PatientPod/" + arbitraryPacket.practice + "/" + arbitraryPacket.logDetailPk + "/" + arbitraryPacket.medPodId + "/", "PUT", JSON.stringify(arbitraryPacket), "MedPodUser", "8675309");
    };

    //$scope.submitImageData = function () {
    //  var currentDate = new Date();
    //  var patientReadings = {
    //    practice: $scope.imagesData.practice,
    //    logDetailPk: $scope.imagesData.logDetailPk,
    //    timeZoneOffset: currentDate.getTimezoneOffset(),
    //    images: []
    //  };
    //  for (var inc = 0; inc < $scope.imagesData.files.length; inc++) {
    //    patientReadings.images.push($scope.buildImageDataFromFile($scope.imagesData.files[inc]));
    //  }
    //  pvDataService.postVitalsData(patientReadings);
    //};

    //$scope.buildImageDataFromFile = function (file) {
    //  var reader = new FileReader();
    //  var currentDate = new Date();

    //  reader.readAsDataURL(file);

    //  var mediaTypeAndEncodingIdx = reader.result.search(',');
    //  var mediaTypeAndEncoding = reader.result.substr(0, mediaTypeAndEncodingIdx);
    //  var encodingIdx = mediaTypeAndEncoding.search(';');
    //  // ignore the "data:" portion of the URL.
    //  var mediaType = mediaTypeAndEncoding.substring(5, encodingIdx);
    //  var encoding = mediaTypeAndEncoding.substr(encodingIdx + 1);
    //  var name = file.name;
    //  if (name.lastIndexOf('.') != -1) {
    //    name = name.substr(0, name.lastIndexOf('.'));
    //  }

    //  var fileInfo = {
    //    name: name,
    //    mediaType: mediaType,
    //    encoding: encoding,
    //    data: reader.result.substr(mediaTypeAndEncodingIdx + 1),
    //    serialNumber: "123456789ABCD12345",
    //    timeStamp: currentDate.getTime(),
    //  };

    //  return (fileInfo);
    //};

    $scope.submitMedPodData = function () {
      pvDataService.postMedPodId($scope.medPodData.practice, $scope.medPodData.logDetailPk, $scope.medPodData.medPodId);
    };

    function getTempLocation() {
      if (angular.isDefined($scope.vitalsData.temperatureLocation)) {
        return $scope.vitalsData.temperatureLocation.name;
      }
      return '';
    }

    function getO2Delivery() {
      if (angular.isDefined($scope.vitalsData.o2Delivery)) {
        return $scope.vitalsData.o2Delivery.id;
      }
      return '';
    }

    function getO2Route() {
      if (angular.isDefined($scope.vitalsData.o2Route)) {
        return $scope.vitalsData.o2Route.name;
      }
      return '';
    }

    //pvDataService.getClientIP().then(function (clientIP) {
    //  $log.info(clientIP);
    //  $scope.clientIP = clientIP;
    //});
  }
);