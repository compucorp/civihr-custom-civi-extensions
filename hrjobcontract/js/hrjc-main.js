console.log('hrjc-main');
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        angular: 'vendor/angular/angular.min',
        angularBootstrap: 'vendor/angular/ui-bootstrap-tpls',
        angularRoute: 'vendor/angular/angular-route.min',
        bootstrap: 'vendor/bootstrap',
        jquery: 'vendor/jquery/jquery.min',
        jqueryPrivate: 'vendor/jquery/jquery-private',
        mock: 'hrjc-mock'
    },
    map: {
        '*': {
            jquery: 'jqueryPrivate'
        },
        jqueryPrivate: {
            jquery: 'jquery'
        }
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        angularBootstrap: {
            deps: ['angular']
        }
    }
});

require([
    'angular',
    'app',
    'controllers/root',
    'controllers/contractList'
],function(angular, app){
    'use strict';

    app.constant('settings', {
        classNamePrefix: 'hrjobcont-',
        templatePath: '/sites/all/modules/civicrm/tools/extensions/civihr/hrjobcontract'
    });

    app.config(['settings','$routeProvider',
        function(settings, $routeProvider){
            $routeProvider.
                when('/', {
                    controller: 'ContractListCtrl',
                    templateUrl: settings.templatePath+'/views/listContract.html?v='+(new Date()).getTime()
                }
            ).otherwise({redirectTo:'/'});
        }
    ]);

    //TODO
    document.addEventListener('hrjcLoad', function(){
        angular.bootstrap(document.getElementById('hrjob-contract'), ['hrjc']);
    });

})