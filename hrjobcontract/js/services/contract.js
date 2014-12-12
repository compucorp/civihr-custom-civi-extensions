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
            get: function(contactId) {
                var deffered = $q.defer(),
                    params = {
                        sequential: 1,
                        contact_id: settings.contactId
                    };

                if (contactId && typeof +contactId === 'number') {
                    params.contact_id = contactId;
                }

                Contract.get({json: params}, function(data){
                    deffered.resolve(data.values);
                },function(){
                    deffered.reject('Unable to fetch contract list');
                });

                return deffered.promise;
            },
            getOne: function(contractId, contactId){

                if (!contractId || typeof +contractId !== 'number') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = {
                        sequential: 1,
                        contact_id: settings.contactId,
                        id: contractId
                    },
                    val;

                if (contactId && typeof +contactId === 'number') {
                    params.contact_id = contactId;
                }

                Contract.get({json: params}, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
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