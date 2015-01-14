console.log('Service: ContractPensionService');
define(['services/services'], function (services) {

    services.factory('ContractPensionService', ['$resource', 'settings', '$q', function ($resource, settings, $q) {
        var ContractPension = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobPension',
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

                ContractPension.get({json: params}, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract pension');
                });

                return deffered.promise;
            },
            getOptions: function(fieldName, callAPI){
                var deffered = $q.defer(), data;

                if (!callAPI) {
                    var data = settings.CRM.options.HRJobPension || {};

                    if (fieldName && typeof fieldName === 'string') {
                        data = data[optionGroup];
                    }

                    deffered.resolve(data || {});
                } else {
                    //TODO call2API
                }

                return deffered.promise;
            },
            save: function(contractPension){

                if (!contractPension || typeof contractPension !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1
                    },contractPension),
                    val;

                ContractPension.save({
                    action: 'create',
                    json: params
                }, null, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract pension');
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

                ContractPension.get({
                    action: 'getfields',
                    json: params
                }, function(data){

                    if (!data.values) {
                        deffered.reject('Unable to fetch contract pension fields');
                    }

                    i = 0, val = data.values, len = val.length;

                    for (i; i < len; i++) {
                        model[val[i].name] = null;
                    }

                    deffered.resolve(model);
                },function(){
                    deffered.reject('Unable to fetch contract pension fields');
                });

                return deffered.promise;
            }
        }

    }]);

});