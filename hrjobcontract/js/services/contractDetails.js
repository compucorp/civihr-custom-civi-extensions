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
            getContractDetails: function(contractId) {
                console.log('getContractDetails:' + contractId);
                var deffered = $q.defer(),
                    params = {
                        sequential: 1
                    }

                if (contractId && typeof +contractId === 'number') {
                    params.jobcontract_id = contractId;
                }

                ContractDetails.get({json: params}, function(data){
                    deffered.resolve(data.values);
                },function(){
                    deffered.reject('Unable to fetch contract details');
                });

                return deffered.promise;
            }
        }

    }]);

});