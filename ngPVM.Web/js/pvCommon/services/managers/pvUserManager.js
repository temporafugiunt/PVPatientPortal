'use strict';

commonApp.factory('pvUserManager',
    function ($q, $http, $cookieStore, $rootScope, pvResources) {
        return {
            login: function (userName, password) {
                var oldActiveUser = this.getActiveUser();
                var loginFailureReason = '';
                var loginSuccess = false;
                if (userName === 'fail') {
                    loginFailureReason = 'Invalid User Name or Password';
                } else {
                    loginSuccess = true;
                    $cookieStore.put('pvmActiveUser', userName);
                    $rootScope.$broadcast("pvActiveUserChanged", userName, oldActiveUser);
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
                $rootScope.$broadcast("pvActiveUserChanged", newUser, oldActiveUser);
            },
            getActiveUser: function () {
                return $cookieStore.get('pvmActiveUser');
            }
        };
    }
);
