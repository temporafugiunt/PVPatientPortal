'use strict';

currentApp.controller('pvMyInfoController',
  function pvMyInfoController($scope, $log, $route, pvResources, pvDataService, pvUserManager) {
    
    $scope.connectionError = '';
    $scope.inAppointment = false;
    $scope.waitingForProvider = false;
    $scope.lastConnectionId = '';

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
      $scope.patientAppointmentList.data = pvDataService.getPatientPortalAppointmentsForCurrentDate($scope.patientAppointmentList.practice, pvUserManager.getActiveUserPk());
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
      }
    };

    $scope.connectToAppointment = function (appointment) {
      $scope.destroyConnection();
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
    }

    $scope.terminateAppointment = function() {
      // TODO - Update to new method once replaced.
      //window.existingCall.close();
      //  step2();
      $scope.destroyConnection();
      $scope.inAppointment = false;
    }

    $scope.retryInitiateVideo = function () {
      // TODO - angular error message shower thingy
      //$('#step1-error').hide();
      //step1();
    }
    
    //peer.on('open', function () {
    //  //$('#my-id').text(peer.id);
    //});

    //// Receiving a call
    //peer.on('call', function(call) {
    //  // Answer the call automatically (instead of prompting user) for demo purposes
    //  //call.answer(window.localStream);
    //  //step3(call);
    //  });
    //peer.on('error', function(err) {
    //  alert(err.message);
    //    // Return to step 2 if error occurs
    //    //step2();
    //});

//    // Get things started
//    step1();
    

//    function step1 () {
//      // Get audio/video stream
//      navigator.getUserMedia({
//        audio: true, video: true
//      }, function (stream) {
//        // Set your video displays
//        $('#my-video').prop('src', URL.createObjectURL(stream));

//        window.localStream = stream;
//        step2();
//        }, function() {
//$('#step1-error').show(); });
//        }

//      function step2 () {
//        $('#step1, #step3').hide();
//        $('#step2').show();
//        }

//      function step3 (call) {
//        // Hang up on an existing call if present
//        if (window.existingCall) {
//          window.existingCall.close();
//      }

//      // Wait for stream on the call, then set peer video display
//      call.on('stream', function(stream) {
//        $('#their-video').prop('src', URL.createObjectURL(stream));
//        });

//        // UI stuff
//      window.existingCall = call;
//      $('#their-id').text(call.peer);
//      call.on('close', step2);
//      $('#step1, #step2').hide();
//      $('#step3').show();
//      }
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