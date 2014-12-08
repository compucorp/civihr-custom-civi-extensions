console.log('app');
define(['angular', 'controllers/controllers', 'directives/directives',
    'filters/filters', 'services/services'], function(angular){
    return angular.module('hrjc',['controllers','directives','filters','services']);
});