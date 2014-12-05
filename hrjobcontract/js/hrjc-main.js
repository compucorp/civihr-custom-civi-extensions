console.log('hrjc-main');
require.config({
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
    'jquery',
    'mock'
],function(angular, app, $, mock){
    'use strict';

    //TODO
    document.addEventListener('hrjcLoad', function(){
        angular.bootstrap(document.getElementById('hrjob-contract'), ['hrjc']);
        mock.init();
    });

})