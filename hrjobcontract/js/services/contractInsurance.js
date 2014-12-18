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
            getOne: function(contractId) {

                if (!contractId || typeof +contractId !== 'number') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = {
                        sequential: 1,
                        jobcontract_id: contractId
                    },
                    val;

                ContractInsurance.get({json: params}, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract Insurance');
                });

                return deffered.promise;
            },
            save: function(contractInsurance){

                if (!contractInsurance || typeof contractInsurance !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1
                    },contractInsurance);

                ContractInsurance.save({
                    action: 'create',
                    json: params
                }, null, function(){
                    deffered.resolve(contractInsurance);
                },function(){
                    deffered.reject('Unable to fetch contract insurance');
                });

                return deffered.promise;
            }
        }

    }]);

});