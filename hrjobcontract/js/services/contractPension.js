console.log('Service: ContractPensionService');
define(['services/services'], function (services) {

    services.factory('ContractPensionService', ['$resource', 'settings', '$q', function ($resource, settings, $q) {
        var ContractDetails = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobPension',
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

                ContractDetails.get({json: params}, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract pension');
                });

                return deffered.promise;
            },
            save: function(contractPension){

                if (!contractPension || typeof contractPension !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1
                    },contractPension);

                ContractDetails.save({
                    action: 'create',
                    json: params
                }, null, function(){
                    deffered.resolve(contractPension);
                },function(){
                    deffered.reject('Unable to fetch contract pension');
                });

                return deffered.promise;
            }
        }

    }]);

});