console.log('Service: ContractDetailsService');
define(['services/services'], function (services) {

    services.factory('ContractDetailsService', ['$resource', 'settings', '$q', function ($resource, settings, $q) {
        var ContractDetails = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobDetails',
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

                ContractDetails.get({json: params}, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract details');
                });

                return deffered.promise;
            },
            getOptions: function(fieldName, callAPI){
                var deffered = $q.defer(), data;

                if (!callAPI) {
                    var data = settings.CRM.options.HRJobDetails || {};

                    if (fieldName && typeof fieldName === 'string') {
                        data = data[optionGroup];
                    }

                    deffered.resolve(data || {});
                } else {
                    //TODO call2API
                }

                return deffered.promise;
            },
            save: function(contractDetails){

                if (!contractDetails || typeof contractDetails !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1
                    },contractDetails),
                    val;

                ContractDetails.save({
                    action: 'create',
                    json: params
                }, null, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract details');
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

                ContractDetails.get({
                    action: 'getfields',
                    json: params
                }, function(data){

                    if (!data.values) {
                        deffered.reject('Unable to fetch contract details fields');
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

                    if (typeof model.location !== 'undefined') {
                        model.location = null;
                    }

                    deffered.resolve(model);
                },function(){
                    deffered.reject('Unable to fetch contract details fields');
                });

                return deffered.promise;
            }
        }

    }]);

});