describe('pvCommon', function () {
    var $injcetor = angular.injector(['pvCommon', 'ngMock']);

    describe('services', function() {

        describe('data', function () {

            describe('pvUtilityService', function() {
                var pvUtilityService = $injcetor.get('pvUtilityService');
                describe('trim', function() {
                    it('should remove spaces from the beginning and end of a string', function() {
                        var test = ' this is a test phrase ';
                        var actual = pvUtilityService.trim(test);
                        var expected = 'this is a test phrase';
                        expect(actual).toBe(expected);
                    });
                });
                describe('standardizeRouteParam', function() {
                    it('should remove slashes from a string', function() {
                        var test = '/testroute/';
                        var actual = pvUtilityService.standardizeRouteParam(test);
                        var expected = 'testroute';
                        expect(actual).toBe(expected);
                    });
                    it('should return an empty string for undefined param', function() {
                        expect(pvUtilityService.standardizeRouteParam(undefined)).toBe('');
                    });
                    it('should return an empty string for slash', function () {
                        expect(pvUtilityService.standardizeRouteParam('/')).toBe('');
                    });
                    it('should return an empty string for an empty string param', function () {
                        expect(pvUtilityService.standardizeRouteParam('')).toBe('');
                    });
                });
            });
        });

        describe('managers', function() {

            describe('pvMenuAndRouteManager', function () {

                var pvMenuAndRouteManager = $injcetor.get('pvMenuAndRouteManager');

                describe('menuItemClick', function() {
                    it('should be in scope', function() {
                        expect(pvMenuAndRouteManager.menuItemClick).not.toBe(undefined);
                    });
                });

                describe('isSameRoute', function() {
                    it('should identify identical routes', function() {
                        var test1 = {
                                ngRoute: 'test',
                                ngApp: 'testApp',
                                serverRoute: 'hello/world'
                            },
                            test2 = {
                                ngRoute: 'test',
                                ngApp: 'testApp',
                                serverRoute: 'hello/world'
                            },
                            actual = pvMenuAndRouteManager.isSameRoute(test1, test2),
                            expected = true;
                        expect(actual).toBe(expected);
                    });
                    it('should sanitize and identify identical routes', function() {
                        var test1 = {
                                ngRoute: 'test/route',
                                ngApp: 'testApp',
                                serverRoute: 'hello/world'
                            },
                            test2 = {
                                ngRoute: 'test/route/',
                                ngApp: 'testApp',
                                serverRoute: '/hello/world/'
                            },
                            actual = pvMenuAndRouteManager.isSameRoute(test1, test2),
                            expected = true;
                        expect(actual).toBe(expected);
                    });
                    it('should identify different routes', function () {
                        var test1 = {
                                ngRoute: 'test',
                                ngApp: 'testApp',
                                serverRoute: 'hello/world'
                            },
                            test2 = {
                                ngRoute: 'blah',
                                ngApp: 'testApp',
                                serverRoute: 'hello/world'
                            },
                            actual = pvMenuAndRouteManager.isSameRoute(test1, test2),
                            expected = false;
                        expect(actual).toBe(expected);
                    });
                });

            });

        });

    });
});