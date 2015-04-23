'use strict';

currentApp.controller('pvLoginController',
    function pvLoginController($scope, $log, $location, $route, $window, pvResources, pvUserManager) {
        $log.info($route.current.controller + " executing.");

        $scope.loginFailed = false;
        $scope.loginFailureMessage = '';
        $scope.userNameIsFocus = true;
        $scope.logoImage = pvResources.addWebsiteBasePath('/Content/Images/logo1.jpg');

        $scope.login = function (userName, password) {
            var loginResult = pvUserManager.login(userName, password, $scope.loginFailure);
            if (!loginResult.loginSuccess) {
                $scope.loginFailureMessage = loginResult.loginFailureReason;
                $scope.loginFailed = true;
                $scope.userNameIsFocus = true;
            }
        };
    }
);