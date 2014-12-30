console.log('Service: ContractInsuranceService');
define(['services/services'], function (services) {

    services.factory('ContractInsuranceService', ['$resource', 'settings', '$q', function ($resource, settings, $q) {
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

                var deffered = $q.defer(),
                    val;

                ContractInsurance.get({json: params}, function(data){
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
                        sequential: 1
                    },contractInsurance),
                    val;

                ContractInsurance.save({
                    action: 'create',
                    json: params
                }, null, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract insurance');
                });

                return deffered.promise;
            }
        }

    }]);

});