console.log('Service: ContractService');
define(['services/services'], function (services) {

    services.factory('Contract',['$resource', 'settings', function($resource, settings){
        //return $resource(settings.pathApp+'/data/contractList.json',{
        return $resource(settings.pathRest,{
                action: 'get',
                entity: 'HRJobContract',
                json: {
                    contact_id: settings.contactId
                },
                api_key: settings.keyApi,
                key: settings.key
            })
    }]);

    services.factory('ContractService', ['Contract','settings','$q', function (Contract, settings, $q) {
        return {
            getContract: function(contractId) {
                var deffered = $q.defer();
                var params = {};
                if (contractId) {
                    params = {
                        json: {
                            contact_id: settings.contactId,
                            id: contractId
                        }
                    }
                }

                Contract.get(params, function(contractList){
                    deffered.resolve(contractList);
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