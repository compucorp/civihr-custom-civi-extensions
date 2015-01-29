console.log('Init: hrjc-main');
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        angular: 'vendor/angular/angular.min',
        angularAnimate: 'vendor/angular/angular-animate.min',
        angularBootstrap: 'vendor/angular/ui-bootstrap-tpls',
        angularFileUpload: 'vendor/angular/angular-file-upload',
        angularResource: 'vendor/angular/angular-resource.min',
        angularRoute: 'vendor/angular/angular-route.min',
        bootstrap: 'vendor/bootstrap',
        fraction: 'vendor/fraction',
        moment: 'vendor/moment.min'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularAnimate: {
            deps: ['angular']
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
    'controllers/revisionList',
    'controllers/modal/modalChangeReason',
    'controllers/modal/modalContract',
    'controllers/modal/modalContractNew',
    'controllers/modal/modalDialog',
    'controllers/modal/modalRevision',
    'controllers/form/formGeneral',
    'controllers/form/formHours',
    'controllers/form/formInsurance',
    'controllers/form/formPay',
    'controllers/form/formPension',
    'directives/directives',
    'directives/loader',
    'filters/capitalize',
    'filters/getObjById',
    'filters/formatAmount',
    'filters/formatPeriod',
    'filters/parseInt'
],function(angular, app){
    'use strict';

    app.config(['settings','$routeProvider','$resourceProvider',
        function(settings, $routeProvider, $resourceProvider){
            $routeProvider.
                when('/', {
                    controller: 'ContractListCtrl',
                    templateUrl: settings.pathApp+'views/contractList.html?v='+(new Date()).getTime(),
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

    app.run(['settings','$rootScope','$q', 'ContractService', 'ContractDetailsService', 'ContractHoursService',
        'ContractPayService', 'ContractLeaveService', 'ContractInsuranceService', 'ContractPensionService',
        function(settings, $rootScope, $q, ContractService, ContractDetailsService, ContractHoursService, ContractPayService,
                 ContractLeaveService, ContractInsuranceService, ContractPensionService){
            $rootScope.pathTpl = settings.pathTpl;
            $rootScope.prefix = settings.classNamePrefix;

            $q.all({
                contract: ContractService.getRevisionOptions(),
                details: ContractDetailsService.getOptions(),
                hours: ContractHoursService.getOptions(),
                pay: ContractPayService.getOptions(),
                leave: ContractLeaveService.getOptions(),
                insurance: ContractInsuranceService.getOptions(),
                pension: ContractPensionService.getOptions()
            }).then(function(results){
                results.details.is_primary = ['No','Yes'];
                results.pension.is_enrolled = ['No','Yes','Opted out'];

                console.log('======================');
                console.info('OPTIONS:');
                console.log(results);
                $rootScope.options = results;

            });
        }
    ]);

    document.addEventListener('hrjcLoad', function(e){

        app.constant('settings', {
            classNamePrefix: 'hrjc-',
            contactId: CRM.jobContractTabApp.contactId,
            debug: 1,
            pathApp: CRM.jobContractTabApp.path,
            pathFile: CRM.url('civicrm/hrjobcontract/file/'),
            pathReport: CRM.url('civicrm/report/hrjobcontract/summary'),
            pathRest: CRM.config.resourceBase + '/extern/rest.php',
            pathTpl: CRM.jobContractTabApp.path + 'views/',
            keyApi: e.detail.keyApi,
            key: e.detail.key,
            CRM: {
                options: CRM.FieldOptions || {},
                defaultCurrency: CRM.jobContractTabApp.defaultCurrency,
                apiTsFmt: 'YYYY-MM-DD HH:mm:ss',
                fields: CRM.jobContractTabApp.fields
            }
        });

        angular.bootstrap(document.getElementById('hrjob-contract'), ['hrjc']);

    });

})