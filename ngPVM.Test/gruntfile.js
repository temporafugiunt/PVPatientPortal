module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                '../ngpvm.web/js'
            ],
            options: {
                curly: true,
                camelcase: true,
                forin: true,
                strict: false,
                node: true,
                '-W041': false,
                globals: {
                    '$': true,
                    'jQuery': true,
                    'angular': true,
                    'commonApp': true,
                    'currentApp': true,
                    'moment': true,
                    'btoa': true,
                    'FileReader': true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);
};