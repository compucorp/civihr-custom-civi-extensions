console.log('Service: ContractInsuranceService');
define(['services/services',
        'services/utils'], function (services) {

    services.factory('ContractInsuranceService', ['$resource', 'settings', '$q', 'UtilsService',
        function ($resource, settings, $q, UtilsService) {

        var ContractInsurance = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobHealth',
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

                ContractInsurance.get({json: params}, function(data){

                    if (UtilsService.errorHandler(data,'Unable to fetch contract Insurance', deffered)) {
                        return
                    }

                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract Insurance');
                });

                return deffered.promise;
            },
            getOptions: function(fieldName, callAPI){
                var deffered = $q.defer(), data;

                if (!callAPI) {
                    var data = settings.CRM.options.HRJobHealth || {};

                    if (fieldName && typeof fieldName === 'string') {
                        data = data[fieldName];
                    }

                    deffered.resolve(data || {});
                } else {
                    //TODO call2API
                }

                return deffered.promise;
            },
            save: function(contractInsurance){

                if (!contractInsurance || typeof contractInsurance !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1,
                        debug: settings.debug
                    },contractInsurance),
                    val;

                ContractInsurance.save({
                    action: 'create',
                    json: params
                }, null, function(data){

                    if (UtilsService.errorHandler(data,'Unable to create contract insurance', deffered)) {
                        return
                    }

                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to create contract insurance');
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
                    i = 0, len, model = {}, val;

                params.sequential = 1;

                ContractInsurance.get({
                    action: 'getfields',
                    json: params
                }, function(data){

                    if (!data.values) {
                        deffered.reject('Unable to fetch contract insurance fields');
                    }

                    i = 0, val = data.values, len = val.length;

                    for (i; i < len; i++) {
                        model[val[i].name] = '';
                    }

                    if (typeof model.id !== 'undefined') {
                        model.id = null;
                    }

                    if (typeof model.jobcontract_revision_id !== 'undefined') {
                        model.jobcontract_revision_id = null;
                    }

                    deffered.resolve(model);
                },function(){
                    deffered.reject('Unable to fetch contract insurance fields');
                });

                return deffered.promise;
            }
        }

    }]);

});