console.log('app');
define(['angular', 'angularBootstrap', 'angularRoute', 'controllers/controllers', 'directives/directives',
    'filters/filters', 'services/services'], function(angular){
    return angular.module('hrjc',['ngRoute','ui.bootstrap','controllers','directives','filters','services']);
});