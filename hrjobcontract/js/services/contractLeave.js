console.log('Service: ContractLeaveService');
define(['services/services'], function (services) {

    services.factory('ContractLeaveService', ['$resource', '$q', 'settings', function ($resource, $q, settings) {

        var ContractLeave = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobLeave',
            json: {},
            api_key: settings.keyApi,
            key: settings.key
        });

        var resp = {
            "version": 3,
            "values": [
                {
                    "id": "2",
                    "leave_type": "1",
                    "leave_amount": "10",
                    "jobcontract_revision_id":"22"
                }, {
                    "jobcontract_id": "14",
                    "leave_type": "2",
                    "leave_amount": "5"
                }, {
                    "jobcontract_id": "14",
                    "leave_type": "3",
                    "leave_amount": 0
                }, {
                    "jobcontract_id": "14",
                    "leave_type": "4",
                    "leave_amount": 0
                }, {
                    "jobcontract_id": "14",
                    "leave_type": "5",
                    "leave_amount": 0
                }, {
                    "jobcontract_id": "14",
                    "leave_type": "6",
                    "leave_amount": 0
                }]
        }

        return {
            get: function(params){

                if (!params || typeof params !== 'object') {
                    return null;
                }

                if (!params.contractId || typeof +params.contractId !== 'number') {
                    return null;
                }

                if ((params.id && typeof +params.id !== 'number') ||
                    (params.leaveType && typeof +params.leaveType !== 'number')) {
                    return null;
                }

                var deffered = $q.defer();

                setTimeout(function(){
                    deffered.resolve(resp.values);
                },0);

                return deffered.promise;
            }
        }

    }]);
});