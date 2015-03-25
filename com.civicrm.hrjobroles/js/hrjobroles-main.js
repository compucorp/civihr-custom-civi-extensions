require.config({    urlArgs: "bust=" + (new Date()).getTime(),    paths: {        angular: 'vendor/angular/angular.min',        angularBootstrap: 'vendor/angular/ui-bootstrap-tpls',        angularResource: 'vendor/angular/angular-resource.min',        angularRoute: 'vendor/angular/angular-route.min'    },    shim: {        angular: {            exports: 'angular'        },        angularBootstrap: {            deps: ['angular']        },        angularResource: {            deps: ['angular']        },        angularRoute: {            deps: ['angular']        }    }});require([    'angular',    'app',    'controllers/example',    'services/example',    'directives/example'],function(angular, app){    'use strict';    app.constant('settings', {        classNamePrefix: 'hrjobroles-',        contactId: decodeURIComponent((new RegExp('[?|&]cid=([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null,        debug: true,        pathApp: '',        pathRest: CRM.url('civicrm/ajax/rest'),        pathBaseUrl: CRM.vars.hrjobroles.baseURL + '/',        pathTpl: 'views/',        pathIncludeTpl: 'views/include/'    });    app.config(['settings','$routeProvider','$resourceProvider','$httpProvider','$logProvider',        function(settings, $routeProvider, $resourceProvider, $httpProvider, $logProvider){            $logProvider.debugEnabled(settings.debug);            $routeProvider.                when('/', {                    controller: 'ExampleCtrl',                    templateUrl: settings.pathBaseUrl + settings.pathTpl + 'mainTemplate.html',                    resolve: {}                }).                otherwise({redirectTo:'/'});            $resourceProvider.defaults.stripTrailingSlashes = false;            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';        }    ]);    app.run(['settings','$rootScope','$q', '$log',        function(settings, $rootScope, $q, $log){            $log.debug('app.run');            // Pass the values from our settings            $rootScope.contactId = settings.contactId;            $rootScope.pathBaseUrl = settings.pathBaseUrl;            $rootScope.pathTpl = settings.pathTpl;            $rootScope.pathIncludeTpl = settings.pathIncludeTpl;            $rootScope.prefix = settings.classNamePrefix;        }    ]);    document.addEventListener('hrjobrolesLoad', function(){        angular.bootstrap(document.getElementById('hrjobroles'), ['hrjobroles']);    });});