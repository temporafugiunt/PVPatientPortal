'use strict';

// Declare app level module for the PV Common 
var commonApp = angular.module('pvCommon', ['ngCookies']);

// Compatibility shim for WebRTC
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
