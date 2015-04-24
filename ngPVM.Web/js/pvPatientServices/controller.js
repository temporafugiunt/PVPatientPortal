'use strict';

currentApp.controller('pvMyInfoController',
  function pvMyInfoController($scope, $log, $route, pvResources, pvDataService, pvUserManager) {
    
    $scope.connectionError = '';
    $scope.inAppointment = false;
    $scope.waitingForProvider = false;
    $scope.lastConnectionId = '';
    $scope.takingPhoto = false;
    $scope.appointmentContext = {};
    $scope.videoInitialized = false;

    $log.info($route.current.controller + " executing.");

    $scope.patientAppointmentList = {};

    $scope.practice = "TEST";

    $scope.patientAppointmentList.data = pvDataService.getPatientPortalAppointmentsForCurrentDate($scope.practice, pvUserManager.getActiveUserPk());
    $scope.patientAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    $scope.asProperDateTime = function (dateTime) {
      if (angular.isDefined(dateTime)) {
        var momentDateTime = moment(dateTime);
        return momentDateTime.format("dddd, MMMM Do YYYY, h:mm:ss a");
      }
      return '';
    };

    $scope.getPatientAppointments = function () {
      $scope.patientAppointmentList.data = pvDataService.getPatientPortalAppointmentsForCurrentDate($scope.practice, pvUserManager.getActiveUserPk());
      $scope.patientAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    };

    $scope.destroyConnection = function() {
      if (angular.isDefined($scope.peer)) {
        $scope.peer.destroy();
        delete $scope.peer;
      }
      if (angular.isDefined($scope.localStream)) {
        $scope.localStream.stop();
        delete $scope.localStream;
        $scope.videoInitialized = false;
      }
    };

    $scope.connectToAppointment = function (appointment) {
      $scope.destroyConnection();
      $scope.appointmentContext = appointment;
      $scope.connectionError = '';
      $scope.inAppointment = true;
      $scope.waitingForProvider = true;
      $scope.appointmentProvider = appointment.providerName;
      $scope.appointmentTime = $scope.asProperDateTime(appointment.appointmentTimeIn);

      // Capture video of local computer for first time.
      if (!angular.isDefined($scope.localStream)) {
        // Get audio/video stream
        navigator.getUserMedia({
          audio: true, video: true
        }, function (stream) {
          // Set your video displays
          $('#my-video').prop('src', URL.createObjectURL(stream));
          $scope.videoInitialized = true;
          $scope.localStream = stream;
          $scope.$apply();
          $log.info('Created local media stream.');
        }, function() {
          $scope.inAppointment = false;
          $scope.waitingForProvider = false;
          $scope.connectionError = "Unable to connect to your device's audio and / or video, please try again after you have fixed the problem.";
          $log.info('Could not connect to media stream.');
            $scope.$apply();
        });
      }

      //// PeerJS object
      $scope.peer = new Peer(appointment.logDetailPk, { key: 'sao90qrgmbhs38fr', debug: 3 });
      
      $scope.peer.on('open', function () {
        $scope.lastConnectionId = $scope.peer.id;
        $log.info("Opened connection with ID " + $scope.peer.id);
        $scope.$apply();
      });

      // Receiving a call
      $scope.peer.on('call', function (call) {
        // Answer the call automatically
        call.answer($scope.localStream);

        // Hang up on an existing call if present
        if (angular.isDefined($scope.existingCall)) {
          $scope.existingCall.close();
          delete $scope.existingCall;
        }

        // Wait for stream on the call, then set peer video display
        call.on('stream', function(stream) {
          $('#provider-video').prop('src', URL.createObjectURL(stream));
          $scope.waitingForProvider = false;
          $scope.$apply();
        });

        $scope.existingCall = call;
        call.on('close', function () {
          $scope.waitingForProvider = true;
          $scope.$apply();
        });
      });
      $scope.peer.on('error', function (err) {
        $scope.connectionError = err.message;
        $scope.$apply();
      });
    };

      $scope.clearError = function() {
          $scope.connectionError = '';
      };

      $scope.terminateAppointment = function() {
          $scope.destroyConnection();
          $scope.inAppointment = false;
      };

    $scope.takePhoto = function () {
      $scope.takingPhoto = true;
      var video = $('#my-video')[0];
      var canvas = $('#my-photo-canvas')[0];
      var photo = $('#my-photo')[0];

      var width = video.videoWidth;
      var height = video.videoHeight;

      // Firefox currently has a bug where the height can't be read from the video, so we will make assumptions if this happens.
      if (isNaN(height)) {
        height = width / (4 / 3);
      }

      // Take a frame from the current local stream.
      var context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      $scope.imgData = data;
      photo.setAttribute('src', data);
      
    };

    $scope.sendPhoto = function () {
      var currentMoment = moment();
      var currentDate = new Date();
      var mediaTypeAndEncodingIdx = $scope.imgData.search(',');
      var mediaTypeAndEncoding = $scope.imgData.substr(0, mediaTypeAndEncodingIdx);
      var encodingIdx = mediaTypeAndEncoding.search(';');
      // ignore the "data:" portion of the URL.
      var mediaType = mediaTypeAndEncoding.substring(5, encodingIdx);
      var encoding = mediaTypeAndEncoding.substr(encodingIdx + 1);
      var name = "Patient Capture " + currentMoment.format("h:mm:ss a");
      
      var patientReadings = {
        practice: $scope.practice,
        logDetailPk: $scope.appointmentContext.logDetailPk,
        timeZoneOffset: currentDate.getTimezoneOffset(),
        images: []
      };

      var fileInfo = {
        name: name,
        mediaType: mediaType,
        encoding: encoding,
        data: $scope.imgData.substr(mediaTypeAndEncodingIdx + 1),
        timeStamp: currentDate.getTime(),
        serialNumber: ''
      };

      patientReadings.images.push(fileInfo);
      pvDataService.postVitalsData(patientReadings);

      $scope.takingPhoto = false;
    };

      $scope.retryInitiateVideo = function() {
          // TODO - angular error message shower thingy
      };
  }
);

currentApp.controller('pvProviderInfoController',
  function pvMyInfoController($scope, $log, $route, pvResources, pvDataService, pvUserManager) {
    $log.info($route.current.controller + " executing.");

    $scope.peer = new Peer({key: 'sao90qrgmbhs38fr', debug : 3 });

    $scope.peer.on('open', function () {
      $scope.lastConnectionId = $scope.peer.id;
      $log.info("Opened connection with ID " +$scope.peer.id);
      $scope.$apply();
    });

    $scope.peer.on('error', function (err) {
      $scope.connectionError = err.message;
      $scope.$apply();
    });

    $scope.connectionError = '';
    $scope.inAppointment = false;
    $scope.waitingForPatient = false;
    $scope.lastConnectionId = '';
    $scope.videoInitialized = false;

    
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

    $scope.getAvailableVirtualEncounters = function () {
      $scope.providerAppointmentList.availableVirtualEncounterPatients = pvDataService.getProviderPortalCurrentPatientsForCurrentDate($scope.providerAppointmentList.practice, '');
      $scope.providerAppointmentList.lastOperationTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a Z");
    };

    $scope.destroyConnection = function () {
      // Hang up on an existing call if present
      if (angular.isDefined($scope.existingCall)) {
        $scope.existingCall.close();
        delete $scope.existingCall;
      }

      if (angular.isDefined($scope.localStream)) {
        $scope.localStream.stop();
        delete $scope.localStream;
        $scope.videoInitialized = false;
      }
    };

    $scope.connectToAppointment = function (appointment) {
      $scope.destroyConnection();
      $scope.connectionError = '';
      $scope.inAppointment = true;
      $scope.waitingForPatient = true;
      $scope.patientLastName = appointment.lastName;
      $scope.patientFirstName = appointment.firstName;
      $scope.appointmentTime = $scope.asProperDateTime(appointment.appointmentTimeIn);
      
      // Get audio/video stream
      navigator.getUserMedia({
        audio: true, video: true
      }, function (stream) {
        // Set your video displays
        $('#my-video').prop('src', URL.createObjectURL(stream));
        $scope.localStream = stream;
        $scope.videoInitialized = true;
        $scope.$apply();
        $log.info('Created local media stream.');

        $scope.existingCall = $scope.peer.call(appointment.logDetailPk, $scope.localStream);

        // Wait for stream on the call, then set peer video display
        $scope.existingCall.on('stream', function (stream) {
          $('#patient-video').prop('src', URL.createObjectURL(stream));
          $scope.waitingForPatient = false;
          $scope.$apply();
        });

        $scope.existingCall.on('close', function () {
          $scope.waitingForPatient = true;
          $scope.$apply();
        });

      }, function () {
        $scope.inAppointment = false;
        $scope.waitingForPatient = false;
        $scope.connectionError = "Unable to connect to your device's audio and / or video, please try again after you have fixed the problem.";
        $log.info('Could not connect to media stream.');
        $scope.$apply();
      });
  };

    $scope.clearError = function() {
      $scope.connectionError = '';
    };

    $scope.terminateAppointment = function() {
      $scope.destroyConnection();
      $scope.inAppointment = false;
    };

    $scope.retryInitiateVideo = function() {
      // TODO - angular error message shower thingy
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