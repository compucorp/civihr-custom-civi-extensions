console.log('Controller: RootCtrl');
define(['controllers/controllers'], function(controllers){
    controllers.controller('RootCtrl',['$scope','settings',
        function($scope, settings){
            $scope.prefix = settings.classNamePrefix;
        }]);
});