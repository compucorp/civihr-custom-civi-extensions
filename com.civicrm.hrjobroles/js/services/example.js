define(['services/services'], function (services) {    services.factory('ExampleService',['settings', '$log' , '$q', function(settings, $log, $q){        $log.debug('Service: ExampleService');        return {            getAllJobRoles: function(id) {                var deferred = $q.defer();                CRM.api3('HRVacancy', 'get', {                    "sequential": 1,                    "return": "salary"                }).done(function(result) {                    console.log(result);                    // Passing data to deferred's resolve function on successful completion                    deferred.resolve(result);                }).error(function(result) {                    // Sending a friendly error message in case of failure                    deferred.reject("An error occured while fetching items");                });                // Returning the promise object                return deferred.promise;            }        }    }]);});