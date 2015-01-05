console.log('Init: hrjc-main');
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        angular: 'vendor/angular/angular.min',
        angularBootstrap: 'vendor/angular/ui-bootstrap-tpls',
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
    'controllers/modal/modalContractChange',
    'controllers/modal/modalContractEdit',
    'controllers/modal/modalContractNew',
    'controllers/modal/modalContractView',
    'controllers/modal/modalRevision',
    'controllers/form/formGeneral',
    'controllers/form/formHours',
    'controllers/form/formPay',
    'filters/capitalize',
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
                    templateUrl: settings.pathApp+'/views/contractList.html?v='+(new Date()).getTime(),
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

    app.run(['settings','$rootScope','$q','ContractDetailsService','ContractHoursService','ContractPayService',
        'ContractLeaveService','ContractInsuranceService','ContractPensionService',
        function(settings, $rootScope, $q, ContractDetailsService, ContractHoursService, ContractPayService,
                 ContractLeaveService, ContractInsuranceService, ContractPensionService){
            $rootScope.prefix = settings.classNamePrefix;

            $q.all({
                details: ContractDetailsService.getOptions(),
                hours: ContractHoursService.getOptions(),
                pay: ContractPayService.getOptions(),
                leave: ContractLeaveService.getOptions(),
                insurance: ContractInsuranceService.getOptions(),
                pension: ContractPensionService.getOptions()
            }).then(function(results){
                $rootScope.options = results;
            });
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
            pathRest: '/sites/all/modules/civicrm/extern/rest.php',
            CRM: {
                options: CRM.FieldOptions || {},
                defaultCurrency: CRM.jobContractTabApp.defaultCurrency
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
                    },
                ],
                leave: [],
                insurance: [],
                pension: []
            }
        });

        angular.bootstrap(document.getElementById('hrjob-contract'), ['hrjc']);

    });

})