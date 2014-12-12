console.log('Service: ContractService');
define(['services/services'], function (services) {

    services.factory('Contract',['$resource', 'settings', function($resource, settings){
        //return $resource(settings.pathApp+'/data/contractList.json',{
        return $resource(settings.pathRest,{
                action: 'get',
                entity: 'HRJobContract',
                json: {},
                api_key: settings.keyApi,
                key: settings.key
            })
    }]);

    services.factory('ContractService', ['Contract','settings','$q', function (Contract, settings, $q) {
        return {
            getContract: function(contractId) {
                var deffered = $q.defer();
                var params = {
                    sequential: 1,
                    contact_id: settings.contactId
                };

                if (contractId && typeof +contractId === 'number') {
                    params.id = contractId;
                }

                Contract.get({json: params}, function(data){
                    deffered.resolve(data.values);
                },function(){
                    deffered.reject('Unable to fetch contract list');
                });

                return deffered.promise;
            },
            saveContract: function(){
                var deffered = $q.defer();

                deffered.resolve({
                    "status": "ok"
                });

                return deffered.promise;
            },
            createContract: function(){

            }
        }

    }]);
});