console.log('Service: ContractPayService');
define(['services/services'], function (services) {

    services.factory('ContractPayService', ['$resource', 'settings', '$q', function ($resource, settings, $q) {
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

                var deffered = $q.defer(),
                    val;

                ContractPay.get({json: params}, function(data){
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
                        sequential: 1
                    },contractPay),
                    val;

                ContractPay.save({
                    action: 'create',
                    json: params
                }, null, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract pay');
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

                ContractPay.get({
                    action: 'getfields',
                    json: params
                }, function(data){

                    if (!data.values) {
                        deffered.reject('Unable to fetch contract pay fields');
                    }

                    i = 0, val = data.values, len = val.length;

                    for (i; i < len; i++) {
                        //TODO
                        if (val[i].callback && val[i].callback == 'CRM_Hrjobcontract_Callback::getJSON') {
                            model[val[i].name] = [];
                            continue;
                        }

                        model[val[i].name] = '';

                        if (typeof model.id !== 'undefined') {
                            model.id = null;
                        }

                        if (typeof model.jobcontract_revision_id !== 'undefined') {
                            model.jobcontract_revision_id = null;
                        }
                    }

                    console.log(model);
                    deffered.resolve(model);
                },function(){
                    deffered.reject('Unable to fetch contract pay fields');
                });

                return deffered.promise;
            }
        }

    }]);

});