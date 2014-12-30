console.log('Service: UtilsService');
define(['services/services'], function (services) {

    services.factory('API', ['$resource','settings', function ($resource, settings) {
        return {
            resource: function(entity, action, json) {

                if ((!entity || typeof entity !== 'string') ||
                    (!action || typeof action !== 'string') ||
                    (json && typeof json !== 'object')) {
                    return null;
                }

                return $resource(settings.pathRest,{
                    action: action,
                    entity: entity,
                    json: json,
                    api_key: settings.keyApi,
                    key: settings.key
                })
            }
        }
    }]);

    /** To be removed **/
    services.factory('tempAPI', ['$resource','settings', function ($resource, settings) {
        return {
            resource: function(entity, action, json) {

                if ((!entity || typeof entity !== 'string') ||
                    (!action || typeof action !== 'string') ||
                    (json && typeof json !== 'object')) {
                    return null;
                }

                return $resource(settings.pathApp+'/js/data/'+entity+'.json',{
                    action: action,
                    entity: entity,
                    json: json,
                    api_key: settings.keyApi,
                    key: settings.key
                })
            }
        }
    }]);

    services.factory('UtilsService', ['API','tempAPI','settings','$q', function (API, tempAPI, settings, $q) {
        return {
            getAbsenceType: function(){
                var deffered = $q.defer();

                API.resource('HRAbsenceType','get', {
                    "return": "id,name,title"
                }).get(function(data){
                    deffered.resolve(data.values);
                },function(){
                    deffered.reject('Unable to fetch absence types');
                });

                return deffered.promise;
            },
            getHoursLocation: function(){
                var deffered = $q.defer();

                tempAPI.resource('HRHoursLocation','get').get(function(data){
                    deffered.resolve(data.values);
                },function(){
                    deffered.reject('Unable to fetch standard hours');
                });

                return deffered.promise;
            }

        }
    }]);

});