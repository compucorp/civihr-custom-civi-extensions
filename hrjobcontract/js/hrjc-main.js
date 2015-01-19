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
        moment: 'vendor/moment.min',
        jquery: 'vendor/jquery/jquery.min',
        jqueryPrivate: 'vendor/jquery/jquery-private'
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
    'controllers/form/formPay',
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
                results.pension.is_enrolled = ['No','Yes','Opted out'];

                $rootScope.options = results;

            });
        }
    ]);

    //TODO
    document.addEventListener('hrjcLoad', function(e){

        app.constant('settings', {
            classNamePrefix: 'hrjobcont-',
            contactId: +CRM.cid||null,
            debug: 1,
            pathApp: CRM.jobContractTabApp.path,
            pathFile: CRM.url('civicrm/hrjobcontract/file/upload'),
            pathRest: CRM.config.resourceBase + '/extern/rest.php',
            pathTpl: CRM.jobContractTabApp.path + 'views/',
            keyApi: e.detail.keyApi,
            key: e.detail.key,
            CRM: {
                options: CRM.FieldOptions || {},
                defaultCurrency: CRM.jobContractTabApp.defaultCurrency,
                apiTsFmt: 'YYYY-MM-DD HH:mm:ss'
            },
            entityHistoryFields: {
                details: [
                    {
                        label: 'Position',
                        name: 'position',
                        isOption: false
                    },
                    {
                        label: 'Title',
                        name: 'title',
                        isOption: false
                    },
                    {
                        label: 'Contract type',
                        name: 'contract_type',
                        isOption: false
                    }
                ],
                hours: [
                    {
                        label: 'Hours type',
                        name: 'hours_type',
                        isOption: true
                    },
                    {
                        label: 'Actual hours',
                        name: 'hours_amount',
                        isOption: false
                    },
                    {
                        label: 'Time unit',
                        name: 'hours_unit',
                        isOption: false
                    }
                ],
                pay: [
                    {
                        label: 'Pay Scale / Grade',
                        name: 'pay_scale',
                        isOption: true
                    },
                    {
                        label: 'Pay Amount',
                        name: 'pay_amount',
                        isOption: false
                    },
                    {
                        label: 'Pay Unit',
                        name: 'pay_unit',
                        isOption: true
                    }
                ],
                leave: [],
                insurance: [
                    {
                        label: 'Health Insurance Provider',
                        name: 'provider',
                        isOption: false
                    },
                    {
                        label: 'Health Insurance Plan Type',
                        name: 'plan_type',
                        isOption: true
                    },
                    {
                        label: 'Life Insurance Provider',
                        name: 'provider_life_insurance',
                        isOption: false
                    },
                    {
                        label: 'Life Insurance Plan Type',
                        name: 'plan_type_life_insurance',
                        isOption: true
                    },
                ],
                pension: []
            }
        });

        angular.bootstrap(document.getElementById('hrjob-contract'), ['hrjc']);

    });

})