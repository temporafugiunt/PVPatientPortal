commonApp.directive('pvHref', function ($log, pvResources) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //var ref = attrs.pv-href;
            attrs.$observe('pv-href', function (newValue, oldValue) {
                $log.info('observed change to pv-href', newValue);
                if (newValue !== oldValue) {
                    if (newValue.charAt(0) === '#') {
                        attrs.$set('href', newValue);
                    } else {
                        attrs.$set('href', pvResources.addWebsiteBasePath(newValue));
                    }
                }
            });
        },
    };
});