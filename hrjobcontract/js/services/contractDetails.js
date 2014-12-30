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
            }
        }

    }]);

});