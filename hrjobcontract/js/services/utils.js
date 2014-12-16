console.log('Service: UtilsService');
define(['services/services'], function (services) {

    services.factory('API', ['$resource','settings', function (settings) {
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

    services.factory('UtilsService', ['API','settings','$q', function (settings) {
        return {
            getAbsenceType: function(){
                var deffered = $q.defer(),

                AbsenceType = API.resource('HRAbsenceType','get', {
                    "sequential": 1
                });

                AbsenceType.get(function(data){
                    deffered.resolve(data)
                },function(){
                    deffered.reject('Unable to fetch absence types');
                });

                return derrefed.promise;
            }
        }
    }]);

});