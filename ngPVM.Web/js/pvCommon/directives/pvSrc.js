commonApp.directive('pvSrc', function (pvResources) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('pv-src', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    attrs.$set('src', pvResources.addWebsiteBasePath(newValue));
                }
            });
        },
    };
});