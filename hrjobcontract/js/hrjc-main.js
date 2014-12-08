console.log('hrjc-main');
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'angular': 'vendor/angular/angular.min',
        'bootstrap': 'vendor/bootstrap',
        'jquery': 'vendor/jquery/jquery.min',
        'jquery-private': 'vendor/jquery/jquery-private',
        'mock': 'hrjc-mock'
    },
    map: {
        '*': {
            'jquery': 'jquery-private'
        },
        'jquery-private': {
            'jquery': 'jquery'
        }
    },
    shim: {
        angular: {
            exports: 'angular'
        }
    }
});

require([
    'angular',
    'app',
    'mock',
    'controllers/summary'
],function(angular, app, mock){
    'use strict';

    /*
    app.config(['$routeProvider',
        function($routeProvider){
            $routeProvider.when('/'), {

            }
        }
    ]);
    */

    //TODO
    document.addEventListener('hrjcLoad', function(){
        angular.bootstrap(document.getElementById('hrjob-contract'), ['hrjc']);
        mock.init();
    });

})