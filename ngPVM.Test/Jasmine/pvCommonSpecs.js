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
            });
        });

    });
});