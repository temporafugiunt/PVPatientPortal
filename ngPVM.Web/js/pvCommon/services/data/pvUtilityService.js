'use strict';

commonApp.factory('pvUtilityService',
    function () {
        return {
            standardizeRoute: function (routeInfo) {
                routeInfo.ngRoute = this.standardizeRouteParam(routeInfo.ngRoute);
                routeInfo.serverRoute = this.standardizeRouteParam(routeInfo.serverRoute);
                routeInfo.ngApp = this.standardizeRouteParam(routeInfo.ngApp);
                return (routeInfo);
            },
            standardizeRouteParam: function (routeParam) {
                if ((typeof routeParam == 'undefined') || (routeParam == '') || (routeParam == '/')) {
                    return '';
                }
                return this.trim(routeParam, '/');
            },
            // trim, rtrim, ltrim
            trim: function (str, chr) {
                var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^'+chr+'+|'+chr+'+$', 'g');
                return str.replace(rgxtrim, '');
            },
            rtrim: function (str, chr) {
                var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr+'+$');
                return str.replace(rgxtrim, '');
            },
            ltrim: function (str, chr) {
                var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^'+chr+'+');
                return str.replace(rgxtrim, '');
            },
            getLocalTime: function(date) {
              return (date.getTime() - (date.getTimezoneOffset() * 60000));
            }
        };
    }
);