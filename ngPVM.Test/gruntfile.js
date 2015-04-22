﻿module.exports = function(grunt) {
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
        },

        jasmine: {
            pivitol: {
                src: [
                    '../ngpvm.web/js/pvCommon/app.js',
                    '../ngpvm.web/js/**/*.js'
                ],
                options: {
                    specs: 'jasmine/*.js',
                    vendor: [
                        '../ngpvm.web/scripts/jquery-2.0.3.js',
                        '../ngpvm.web/scripts/angular/angular.js'
                    ],
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('default', ['jshint', 'jasmine']);
};