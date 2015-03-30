define(['angularEditable','controllers/controllers', 'directives/directives', 'filters/filters', 'services/services'], function(){
    return angular.module('hrjobroles',['ngAnimate','ngRoute','xeditable','ngResource','ui.bootstrap','hrjobroles.controllers','hrjobroles.directives','hrjobroles.filters','hrjobroles.services']);
});