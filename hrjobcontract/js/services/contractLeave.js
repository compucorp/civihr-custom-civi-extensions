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

        return {
            get: function (params) {

                if ((!params || typeof params !== 'object') ||
                    (!params.jobcontract_id && !params.jobcontract_revision_id) ||
                    (params.jobcontract_id && typeof +params.jobcontract_id !== 'number') ||
                    (params.jobcontract_revision_id && typeof +params.jobcontract_revision_id!== 'number') ||
                    (params.id && typeof +params.id !== 'number') ||
                    (params.leaveType && typeof +params.leaveType !== 'number')) {
                    return null;
                }

                params.sequential = 1;

                var deffered = $q.defer();

                ContractLeave.get({json: params}, function(data){
                    deffered.resolve(data.values);
                },function(){
                    deffered.reject('Unable to fetch contract leave');
                });

                return deffered.promise;
            },
            getOptions: function(fieldName, callAPI){
                var deffered = $q.defer(), data;

                if (!callAPI) {
                    var data = settings.CRM.options.HRJobLeave || {};

                    if (fieldName && typeof fieldName === 'string') {
                        data = data[optionGroup];
                    }

                    deffered.resolve(data || {});
                } else {
                    //TODO call2API
                }

                return deffered.promise;
            },
            save: function (contractLeave) {

                if (!contractLeave || typeof contractLeave !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = {
                        sequential: 1,
                        values: contractLeave
                    };

                ContractLeave.save({
                    action: 'replace',
                    json: params
                }, null, function (data) {
                    deffered.resolve(data.values);
                }, function () {
                    deffered.reject('Unable to fetch contract details');
                });

                return deffered.promise;
            },
            model: function (leaveType, params) {

                if (!leaveType || typeof leaveType !== 'object') {
                    //TODO UtilsService.getAbsenceType()
                    return null;
                }

                var model = [],
                    params = params || {};

                angular.forEach(leaveType, function (value) {
                    model.push(angular.extend({
                        "jobcontract_id": 0,
                        "leave_type": value.id,
                        "leave_amount": 0
                    },params));
                });

                return model;
            }
        }

    }]);
});