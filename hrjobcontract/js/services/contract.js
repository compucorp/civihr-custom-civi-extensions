console.log('Service: ContractService');
define(['services/services'], function (services) {

    services.factory('Contract',['$resource', 'settings', function($resource, settings){
        return $resource(settings.pathRest,{
                action: 'get',
                entity: 'HRJobContract',
                json: {},
                api_key: settings.keyApi,
                key: settings.key
            })
    }]);

    services.factory('ContractRevision',['$resource', 'settings', function($resource, settings){
        return $resource(settings.pathRest,{
            action: 'get',
            entity: 'HRJobContractRevision',
            json: {},
            api_key: settings.keyApi,
            key: settings.key
        })
    }]);

    services.factory('ContractService', ['Contract','ContractRevision','settings','$q', function (Contract, ContractRevision, settings, $q) {
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
            getRevision: function(contractId) {

                if (!contractId || typeof +contractId !== 'number') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = {
                        sequential: 1,
                        jobcontract_id: contractId
                    };

                ContractRevision.get({json: params}, function(data){
                    deffered.resolve(data.values);
                },function(){
                    deffered.reject('Unable to fetch contract revisions');
                });

                return deffered.promise;

            },
            saveRevision: function(revisionDetails) {

                if ((!revisionDetails || typeof revisionDetails !== 'object') ||
                    (!revisionDetails.id || typeof +revisionDetails.id !== 'number')) {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1
                    },revisionDetails),
                    val;

                ContractRevision.save({
                    action: 'create',
                    json: params
                }, null, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract revision id: ' + revisionId);
                });

                return deffered.promise;

            },
            delete: function(contractId) {

                if (!contractId || typeof +contractId !== 'number') {
                    return null;
                }

                var deffered = $q.defer();

                Contract.delete({
                    action: 'deletecontract',
                    json: { id: contractId }
                }, function(data){
                    deffered.resolve(data);
                },function(){
                    deffered.reject('Could not delete contract ID:'+contractId);
                });

                return deffered.promise;
            }
        }

    }]);
});