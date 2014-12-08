console.log('app');
define(['angular', 'angularRoute', 'controllers/controllers', 'directives/directives',
    'filters/filters', 'services/services'], function(angular){
    return angular.module('hrjc',['ngRoute','controllers','directives','filters','services']);
});