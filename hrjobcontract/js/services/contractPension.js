console.log('Service: ContractPensionService');
define(['services/services',
        'services/utils'], function (services) {

    services.factory('ContractPensionService', ['$resource', 'settings', '$q', 'UtilsService',
        function ($resource, settings, $q, UtilsService) {

        var ContractPension = $resource(settings.pathRest, {
            action: 'get',
            entity: 'HRJobPension',
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
                params.debug = settings.debug;

                var deffered = $q.defer(),
                    val;

                ContractPension.get({json: params}, function(data){

                    if (UtilsService.errorHandler(data,'Unable to fetch contract pension', deffered)) {
                        return
                    }

                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contract pension');
                });

                return deffered.promise;
            },
            getOptions: function(fieldName, callAPI){
                var deffered = $q.defer(), data;

                if (!callAPI) {
                    var data = settings.CRM.options.HRJobPension || {};

                    if (fieldName && typeof fieldName === 'string') {
                        data = data[optionGroup];
                    }

                    deffered.resolve(data || {});
                } else {
                    //TODO call2API
                }

                return deffered.promise;
            },
            save: function(contractPension){

                if (!contractPension || typeof contractPension !== 'object') {
                    return null;
                }

                var deffered = $q.defer(),
                    params = angular.extend({
                        sequential: 1,
                        debug: settings.debug
                    },contractPension),
                    val;

                ContractPension.save({
                    action: 'create',
                    json: params
                }, null, function(data){

                    if (UtilsService.errorHandler(data,'Unable to create contract pension', deffered)) {
                        return
                    }

                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to create contract pension');
                });

                return deffered.promise;
            },
            model: function(params){

                if (params && typeof params !== 'object') {
                    return null;
                }

                if (!params || typeof params !== 'object') {
                    params = {};
                }

                var deffered = $q.defer(),
                    crmFields = settings.CRM.fields,
                    i = 0, len, model = {}, val;

                function clearFields(model) {
                    if (typeof model.id !== 'undefined') {
                        model.id = null;
                    }

                    if (typeof model.jobcontract_revision_id !== 'undefined') {
                        model.jobcontract_revision_id = null;
                    }

                    return model;
                }

                if (crmFields && crmFields.HRJobPension) {

                    deffered.resolve(clearFields(crmFields.HRJobPension));

                } else {

                    params.sequential = 1;

                    ContractPension.get({
                        action: 'getfields',
                        json: params
                    }, function(data){

                        if (!data.values) {
                            deffered.reject('Unable to fetch contract pension fields');
                        }

                        i = 0, val = data.values, len = val.length;

                        for (i; i < len; i++) {
                            model[val[i].name] = '';
                        }

                        deffered.resolve(clearFields(model));
                    },function(){
                        deffered.reject('Unable to fetch contract pension fields');
                    });

                }

                return deffered.promise;
            }
        }

    }]);

});