/*
    This bit of javsascript was getting injected in from a master page,
    so jasmine didn't know about it.  I could probably figure out how to move it to a file, but I 
    don't want to break anything so I just duplicated it here.
*/
commonApp.provider('pvResources', function () {
    // Save your function scope.
    var myThis = this;

    // define your services and properties.
    this.addWebsiteBasePath = function (resourcePath) {
        var basePath = '@HtmlHelpers.WebsiteBasePath()';
        if (resourcePath.charAt(0) === '/') {
            resourcePath = resourcePath.substr(1);
        }
        return (basePath + resourcePath);
    };
    this.apiBaseURL = function () { return '@HtmlHelpers.PvApiBaseURL()'; };
    // Yes, we could get this from $rootElement.attr('ng-app') but this seems cleaner don't you think?
    this.activeNgApp = '@ngAppName';
    this.$get = function () {
        // Pass your original scope.
        return myThis;
    };
});