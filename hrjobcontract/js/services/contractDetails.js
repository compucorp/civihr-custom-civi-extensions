console.log('Service: ContractDetailsService');
define(['services/services'], function (services) {

    services.factory('ContractDetailsService', ['$resource', 'settings', '$q', function ($resource, settings, $q) {
        var ContractDetails = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobData',
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
                    deffered.reject('Unable to fetch contract details');
                });

                return deffered.promise;
            }
        }

    }]);

});