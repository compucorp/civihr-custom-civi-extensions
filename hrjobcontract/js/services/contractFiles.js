console.log('Service: ContractFilesService');
define(['services/services',
        'services/utils'], function (services) {

    services.factory('ContractFilesService', ['$resource', 'settings', '$q', 'UtilsService',
        function ($resource, settings, $q, UtilsService) {
            var ContractFiles = $resource(settings.pathFile+':action');

            return {
                get: function(entityID, entityTable){
                    var deffered = $q.defer();

                    ContractFiles.get({
                        action: 'list',
                        entityTable: entityTable,
                        entityID: entityID
                    }, function(data){

                        if (UtilsService.errorHandler(data,'Unable to fetch files',deffered)) {
                            return
                        }

                        deffered.resolve(data.values);
                    },function(){
                        deffered.reject('Unable to fetch files');
                    });

                    return deffered.promise;
                }
            }

    }]);

});