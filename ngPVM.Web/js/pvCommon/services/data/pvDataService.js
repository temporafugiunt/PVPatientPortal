'use strict';

commonApp.factory('pvDataService',
    function ($q, $http, $log, pvMockDataService, pvResources, pvUtilityService) {
        function makeBasicAuthentication(user, pswd) {
          var tok = user + ':' + pswd;
          var hash = btoa(tok);
          return "Basic " + hash;
        }
        return {
            getUserMenu: function (userName) {
                return pvMockDataService.getMockMenu();
            },
            getUserDefaultRoute: function (userName) {
                return pvMockDataService.getMockDefaultRoute();
            },
            getClientIP: function() {
              return (this.unauthenticatedApiGet("/ClientIP"));
            },
            getVersionInformation: function() {
              return (this.unauthenticatedApiGet("/DocStorage/VersionInformation"));
            },
            getPatientPortalCurrentPatientsForCurrentDate: function (practice, clinic) {
              var currentDate = new Date();
              return (this.unauthenticatedApiGet("/PatientPortal/CurrentPatients/" + currentDate.getTime() + "/" + currentDate.getTimezoneOffset() + "/" + practice + "/" + clinic));
            },
            loginPatientPortal: function (userInfo) {
              return (this.unauthenticatedApiSend("/PatientPortal/Login", "POST", JSON.stringify(userInfo)));
            },
            getPatientPortalCurrentPatientsForServiceDate: function (practice, clinic, serviceDate) {
              var serviceDateAsMoment = moment(serviceDate).toDate();
              return (this.unauthenticatedApiGet("/PatientPortal/CurrentPatients/" + serviceDateAsMoment.getTime() + "/" + serviceDateAsMoment.getTimezoneOffset() + "/" + practice + "/" + clinic));
            },
            postVitalsData: function (patientReadings) {
              return (this.unauthenticatedApiSend("/PatientPortal/PatientReadings", "POST", JSON.stringify(patientReadings)));
            },
            postSessionId: function (practice, logDetailPk, sessionId) {
              return (this.unauthenticatedApiSend("/PatientPortal/SessionId/" + practice + "/" + logDetailPk + "/" + sessionId, "PUT", undefined));
            },
            unauthenticatedApiGet: function (relativeUrl) {
              return (this.unauthenticatedApiSend(relativeUrl, "GET", undefined));
            },
            unauthenticatedApiSend: function (relativeUrl, method, data) {
              var url = pvResources.apiBaseURL() + relativeUrl;
              var result = null;
              $.ajax({
                type: method,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: data,
                url: url,
                async: false,
                crossDomain: true,
                success: function (msgResult) {
                  result = msgResult;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  $log.info('synchronous ajax call failed: ' + jqXHR + ':' + textStatus + ':' + errorThrown);
                }
              });
              return (result);
            },
            authenticatedApiGet: function (relativeUrl, userName, password) {
              return (this.authenticatedApiSend(relativeUrl, "GET", undefined, userName, password));
            },
            authenticatedApiSend: function (relativeUrl, method, data, userName, password) {
              var url = pvResources.apiBaseURL() + relativeUrl;
              var result = null;
              if (angular.isDefined(data)) {
                $.ajax({
                  type: method,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  data: data,
                  url: url,
                  async: false,
                  crossDomain: true,
                  success: function (msgResult) {
                    result = msgResult;
                  },
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", makeBasicAuthentication(userName, password));
                    xhr.withCredentials = true;
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    $log.info('synchronous ajax call failed: ' + jqXHR + ':' + textStatus + ':' + errorThrown);
                  }
                });
              } else {
                $.ajax({
                  type: method,
                  contentType: "application/json; charset=utf-8",
                  url: url,
                  async: false,
                  crossDomain: true,
                  success: function (msgResult) {
                    result = msgResult;
                  },
                  beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", makeBasicAuthentication(userName, password));
                    xhr.withCredentials = true;
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    $log.info('synchronous ajax call failed: ' + jqXHR + ':' + textStatus + ':' + errorThrown);
                  }
                });
              }
              
                
              return (result);
            },
        };
    }
);