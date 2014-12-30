console.log('Service: ContractPayService');
define(['services/services'], function (services) {

    services.factory('ContractPayService', ['$resource', 'settings', '$q', function ($resource, settings, $q) {
        var ContractPay = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobPay',
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

                ContractPay.get({json: params}, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract pay');
                });

                return deffered.promise;
            },
            save: function(contractPay){

                if (!contractPay || typeof contractPay !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1
                    },contractPay),
                    val;

                ContractPay.save({
                    action: 'create',
                    json: params
                }, null, function(data){
                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract pay');
                });

                return deffered.promise;
            }
        }

    }]);

});