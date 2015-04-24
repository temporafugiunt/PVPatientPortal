commonApp.directive('pvFileSelect', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.bind('change', function() {
        $parse(attrs.pvFileSelect).assign(scope, element[0].files);
        scope.$apply();
      });
    },
  };
});