console.log('Service: ContractPayService');
define(['services/services',
        'services/utils'], function (services) {

    services.factory('ContractPayService', ['$resource', 'settings', '$q', 'UtilsService',
        function ($resource, settings, $q, UtilsService) {

        var ContractPay = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobPay',
            json: {},
            api_key: settings.keyApi,
            key: settings.key
        });

        return {
            getOne: function(params) {

                if ((!params || typeof params !== 'object') ||
                    (!params.jobcontract_id && !params.jobcontract_revision_id) ||
                    (params.jobcontract_id && typeof +params.jobcontract_id !== 'number') ||
                    (params.jobcontract_revision_id && typeof +params.jobcontract_revision_id!== 'number')) {
                    return null;
                }

                params.sequential = 1;
                params.debug = settings.debug;

                var deffered = $q.defer(),
                    val;

                ContractPay.get({json: params}, function(data){

                    if (UtilsService.errorHandler(data,'Unable to fetch contract pay', deffered)) {
                        return
                    }

                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract pay');
                });

                return deffered.promise;
            },
            getOptions: function(fieldName, callAPI){
                var deffered = $q.defer(), data;

                if (!callAPI) {
                    var data = settings.CRM.options.HRJobPay || {};

                    if (fieldName && typeof fieldName === 'string') {
                        data = data[optionGroup];
                    }

                    deffered.resolve(data || {});
                } else {
                    //TODO call2API
                }

                return deffered.promise;
            },
            save: function(contractPay){

                if (!contractPay || typeof contractPay !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1,
                        debug: settings.debug
                    },contractPay),
                    val;

                ContractPay.save({
                    action: 'create',
                    json: params
                }, null, function(data){

                    if (UtilsService.errorHandler(data,'Unable to create contract pay', deffered)) {
                        return
                    }

                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to create contract pay');
                });

                return deffered.promise;
            },
            model: function(params){

                if (params && typeof params !== 'object') {
                    return null;
                }

                if (!params || typeof params !== 'object') {
                    params = {};
                }

                var deffered = $q.defer(),
                    crmFields = settings.CRM.fields,
                    i = 0, len, model = {}, val;

                function clearFields(model) {
                    if (typeof model.id !== 'undefined') {
                        model.id = null;
                    }

                    if (typeof model.jobcontract_revision_id !== 'undefined') {
                        model.jobcontract_revision_id = null;
                    }

                    if (typeof model.annual_benefits !== 'undefined') {
                        model.annual_benefits = [];
                    }

                    if (typeof model.annual_deductions !== 'undefined') {
                        model.annual_deductions = [];
                    }

                    return model;
                }

                if (crmFields && crmFields.HRJobPay) {

                    deffered.resolve(clearFields(crmFields.HRJobPay));

                } else {

                    params.sequential = 1;

                    ContractPay.get({
                        action: 'getfields',
                        json: params
                    }, function(data){

                        if (!data.values) {
                            deffered.reject('Unable to fetch contract pay fields');
                        }

                        i = 0, val = data.values, len = val.length;

                        for (i; i < len; i++) {
                            model[val[i].name] = '';
                        }

                        deffered.resolve(clearFields(model));
                    },function(){
                        deffered.reject('Unable to fetch contract pay fields');
                    });

                }

                return deffered.promise;
            }
        }

    }]);

});