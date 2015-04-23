'use strict';

commonApp.factory('pvUserManager',
    function ($q, $http, $cookieStore, $rootScope, pvDataService) {
        return {
            login: function (userName, password) {
                var oldActiveUser = this.getActiveUser();
                var loginFailureReason = '';
                var loginSuccess = false;

                var userInfo = {
                    userName: userName,
                    password: password,
                    practice: "TEST"
                };
                var loginResponse = pvDataService.loginPatientPortal(userInfo);

                if (loginResponse == undefined) {
                    loginFailureReason = 'Invalid User Name or Password';
                } else {
                    loginSuccess = true;
                    $cookieStore.put('pvmActiveUser', loginResponse.userName);
                    $cookieStore.put('pvmActivePractice', loginResponse.practice);
                    $cookieStore.put('pvmActiveUserPk', loginResponse.patInfoPk);
                    $rootScope.$broadcast("pvActiveUserChanged", loginResponse.userName, oldActiveUser);
                }
               
                return {
                    loginSuccess: loginSuccess,
                    loginFailureReason: loginFailureReason
                };
            },
            logout: function() {
                var oldActiveUser = this.getActiveUser();
                var newUser = '';
                $cookieStore.put('pvmActiveUser', newUser);
                $cookieStore.put('pvmActivePractice', '');
                $cookieStore.put('pvmActiveUserPk', '');
                $rootScope.$broadcast("pvActiveUserChanged", newUser, oldActiveUser);
            },
            getActiveUser: function () {
                return $cookieStore.get('pvmActiveUser');
            },
            getActiveUserPk: function () {
              return $cookieStore.get('pvmActiveUserPk');
            },
            getActivePractice: function () {
              return $cookieStore.get('pvmActivePractice');
            }
        };
    }
);
