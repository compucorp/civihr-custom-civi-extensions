console.log('Init: hrjc-main');
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        angular: 'vendor/angular/angular.min',
        angularBootstrap: 'vendor/angular/ui-bootstrap-tpls',
        angularResource: 'vendor/angular/angular-resource.min',
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
        angularBootstrap: {
            deps: ['angular']
        },
        angularResource: {
            deps: ['angular']
        },
        angularRoute: {
            deps: ['angular']
        }
    }
});

require([
    'angular',
    'app',
    'services/contract',
    'controllers/contractList',
    'controllers/contract',
    'controllers/modalContractChange',
    'controllers/modalContractEdit',
    'controllers/modalContractView',
    'controllers/modalRevision',
    'filters/formatPeriod'
],function(angular, app){
    'use strict';

    app.config(['settings','$routeProvider','$resourceProvider',
        function(settings, $routeProvider, $resourceProvider){
            $routeProvider.
                when('/', {
                    controller: 'ContractListCtrl',
                    templateUrl: settings.pathApp+'/views/listContract.html?v='+(new Date()).getTime(),
                    resolve: {
                        contractList: function(ContractService){
                            return ContractService.get()
                        }
                    }
                }
            ).otherwise({redirectTo:'/'});

            $resourceProvider.defaults.stripTrailingSlashes = false;
        }
    ]);

    app.run(['settings','$rootScope',
        function(settings, $rootScope){
            $rootScope.prefix = settings.classNamePrefix;
        }
    ]);

    //TODO
    document.addEventListener('hrjcLoad', function(e){

        app.constant('settings', {
            classNamePrefix: 'hrjobcont-',
            contactId: decodeURIComponent((new RegExp('[?|&]cid=([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null,
            pathApp: '/sites/all/modules/civicrm/tools/extensions/civihr/hrjobcontract',
            keyApi: e.detail.keyApi,
            key: e.detail.key,
            pathRest: '/sites/all/modules/civicrm/extern/rest.php'
        });

        angular.bootstrap(document.getElementById('hrjob-contract'), ['hrjc']);

    });

})