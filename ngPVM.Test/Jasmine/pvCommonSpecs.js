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

    });
});