define(['angular','angularAnimate','angularBootstrap','angularFileUpload','angularResource','angularRoute',
    'controllers/controllers', 'directives/directives', 'filters/filters', 'services/services'], function(angular){
    return angular.module('hrjc',['ngAnimate','ngRoute','ngResource','ui.bootstrap','angularFileUpload','hrjc.controllers','hrjc.directives','hrjc.filters','hrjc.services']);
});