console.log('Service: ContractFilesService');
define(['services/services',
        'services/utils'], function (services) {

    services.factory('ContractFilesService', ['$resource', 'settings', '$q', 'UtilsService','FileUploader',
        function ($resource, settings, $q, UtilsService, FileUploader) {
            var ContractFiles = $resource(settings.pathFile+':action');
                FileUploader.prototype.queueDelete = [];

            return {
                delete: function(fileId, entityId, entityTable){

                    if ((!fileId || typeof +fileId !== 'number') ||
                        (!entityId || typeof +entityId !== 'number') ||
                        (!entityTable || typeof entityTable !== 'string')) {
                        return null;
                    }

                    var deffered = $q.defer();

                    ContractFiles.save({
                        action: 'delete',
                        entityTable: entityTable,
                        entityID: entityId,
                        fileID: fileId
                    }, null, function(data){

                        if (data.values && !+data.values[0].result) {
                            data.is_error = 1;
                        }

                        if (UtilsService.errorHandler(data,'Unable to delete file',deffered)) {
                            return
                        }

                        deffered.resolve(data.values);
                    },function(){
                        deffered.reject('Unable to delete file');
                    });

                    return deffered.promise;
                },
                get: function(entityId, entityTable){

                    if ((!entityId || typeof +entityId !== 'number') ||
                        (!entityTable || typeof entityTable !== 'string')) {
                        return null;
                    }

                    var deffered = $q.defer();

                    ContractFiles.get({
                        action: 'list',
                        entityTable: entityTable,
                        entityID: entityId
                    }, function(data){

                        if (UtilsService.errorHandler(data,'Unable to fetch files',deffered)) {
                            return
                        }

                        deffered.resolve(data.values);
                    },function(){
                        deffered.reject('Unable to fetch files');
                    });

                    return deffered.promise;
                },
                uploader: function(entityTable, queueLimit){

                    if (!entityTable || typeof entityTable !== 'string') {
                        return null;
                    }

                    var uploaderSettings = {
                        url: settings.pathFile + 'upload',
                        formData: [
                            {
                                entityTable: entityTable
                            }
                        ]
                    }

                    if (queueLimit && typeof queueLimit === 'number') {
                        uploaderSettings.queueLimit = queueLimit;
                    }

                    return new FileUploader(uploaderSettings);
                },
                upload: function(uploaderInsance, revisionId) {

                    if (!uploaderInsance || typeof uploaderInsance !== 'object' ||
                        !revisionId || typeof +revisionId !== 'number') {
                        return null;
                    }

                    var deffered = $q.defer();

                    uploaderInsance.onBeforeUploadItem = function(item){
                        item.formData.push({
                            entityID: revisionId
                        });
                    };

                    uploaderInsance.onCompleteItem = function(item, response, status, headers){
                        console.info(' ===== Item Complete: ' + status + ' ======');
                        console.info(' =====  - item ======');
                        console.info(item);
                        console.info(' =====  - response ======');
                        console.info(response);
                        console.info(' =====  - headers ======');
                        console.info(headers);
                    };

                    uploaderInsance.onErrorItem = function(item, response, status, headers){
                        deffered.reject('Could not upload file: '+item.file.name);
                        console.error(' ===== Item Error: ' + status + ' ======');
                        console.error(' =====  - item ======');
                        console.error(item);
                        console.error(' =====  - response ======');
                        console.error(response);
                        console.error(' =====  - headers ======');
                        console.error(headers);
                    };

                    uploaderInsance.onCompleteAll = function(){
                        deffered.resolve(true);
                    };

                    uploaderInsance.uploadAll();

                    return deffered.promise
                }
            }

    }]);

});