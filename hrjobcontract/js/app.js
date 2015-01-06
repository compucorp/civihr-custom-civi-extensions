console.log('Module: hrjc');
define(['angular', 'angularAnimate', 'angularBootstrap', 'angularResource', 'angularRoute', 'controllers/controllers', 'directives/directives',
    'filters/filters', 'services/services'], function(angular){
    return angular.module('hrjc',['ngAnimate','ngRoute','ngResource','ui.bootstrap','controllers','directives','filters','services']);
});