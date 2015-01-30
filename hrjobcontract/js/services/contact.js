console.log('Service: ContactService');
define(['services/services',
        'services/utils'], function (services) {

    services.factory('ContactService', ['$resource', 'settings', '$q', 'UtilsService','$timeout',
        function ($resource, settings, $q, UtilsService,$timeout) {
        var Contact = $resource(settings.pathRest, {
            action: 'getlist',
            entity: 'contact',
            json: {},
            api_key: settings.keyApi,
            key: settings.key
        });

        return {
            getOne: function(id) {

                if (!id || typeof +id !== 'number') {
                    return null
                }

                var deffered = $q.defer(),
                    val;

                Contact.get({json: {
                    id: id,
                    debug: settings.debug
                }}, function(data){

                    if (UtilsService.errorHandler(data,'Unable to fetch contact',deffered)) {
                        return
                    }

                    val = data.values;
                    deffered.resolve(val.length == 1 ? val[0] : null);
                },function(){
                    deffered.reject('Unable to fetch contact');
                });

                return deffered.promise;
            },
            search: function(input, params){

                if ((!input || typeof input === 'undefined') ||
                    (params && typeof params !== 'object')) {
                    return null
                }

                var deffered = $q.defer(),
                    params = params || {};

                Contact.get({json: {
                    input: input,
                    params: params,
                    debug: settings.debug
                }}, function(data){

                    if (UtilsService.errorHandler(data,'Unable to fetch contact list',deffered)) {
                        return
                    }

                    deffered.resolve(data.values);

                },function(){
                    deffered.reject('Unable to fetch contact list');
                });

                return deffered.promise;
            }
        }

    }]);

});