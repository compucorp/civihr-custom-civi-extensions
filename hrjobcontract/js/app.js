console.log('Module: hrjc');
define(['angular', 'angularBootstrap', 'angularResource', 'angularRoute', 'controllers/controllers', 'directives/directives',
    'filters/filters', 'services/services'], function(angular){
    return angular.module('hrjc',['ngRoute','ngResource','ui.bootstrap','controllers','directives','filters','services']);
});