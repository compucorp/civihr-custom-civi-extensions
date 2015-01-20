console.log('Service: ContractLeaveService');
define(['services/services',
        'services/utils'], function (services) {

    services.factory('ContractLeaveService', ['$resource', '$q', 'settings', 'UtilsService',
        function ($resource, $q, settings, UtilsService) {

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
                params.debug = settings.debug;

                var deffered = $q.defer();

                ContractLeave.get({json: params}, function(data){

                    if (UtilsService.errorHandler(data,'Unable to fetch contract leave', deffered)) {
                        return
                    }

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
                        data = data[fieldName];
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
                        values: contractLeave,
                        debug: settings.debug
                    };

                ContractLeave.save({
                    action: 'replace',
                    json: params
                }, null, function (data) {

                    if (UtilsService.errorHandler(data,'Unable to create contract leave', deffered)) {
                        return
                    }

                    deffered.resolve(data.values);
                }, function () {
                    deffered.reject('Unable to create contract details');
                });

                return deffered.promise;
            },
            model: function(params, leaveType){

                if (params && typeof params !== 'object') {
                    return null;
                }

                if (!params || typeof params !== 'object') {
                    params = {};
                }

                var deffered = $q.defer(),
                    i = 0, len, modelEntry = {}, model = [], val;

                function createModel(leaveType, modelEntry) {
                    var model = [];

                    if ((!leaveType || typeof leaveType !== 'object') ||
                        (!modelEntry || typeof modelEntry !== 'object' || typeof modelEntry.leave_type === 'undefined')) {
                        return null;
                    }

                    angular.forEach(leaveType, function(type, typeId){
                        modelEntry.leave_type = typeId;
                        modelEntry.leave_amount = 0;
                        model.push(angular.copy(modelEntry));
                    });

                    return model;
                }

                params.sequential = 1;

                ContractLeave.get({
                    action: 'getfields',
                    json: params
                }, function(data){

                    if (!data.values) {
                        deffered.reject('Unable to fetch contract leave fields');
                    }

                    i = 0, val = data.values, len = val.length;

                    for (i; i < len; i++) {
                        modelEntry[val[i].name] = '';
                    }

                    if (typeof modelEntry.id !== 'undefined') {
                        modelEntry.id = null;
                    }

                    if (typeof modelEntry.jobcontract_revision_id !== 'undefined') {
                        modelEntry.jobcontract_revision_id = null;
                    }

                    if (leaveType && typeof leaveType == 'object') {
                        deffered.resolve(createModel(leaveType,modelEntry));
                        return
                    }

                    this.getOptions('leave_type').then(function(options){
                        deffered.resolve(createModel(options,modelEntry));
                        return
                    });

                }.bind(this),function(){
                    deffered.reject('Unable to fetch contract details fields');
                });

                return deffered.promise;
            }
        }

    }]);
});