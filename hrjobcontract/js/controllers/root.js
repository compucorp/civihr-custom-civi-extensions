console.log('RootCtrl');
define(['controllers/controllers','mock'], function(controllers,mock){
    controllers.controller('RootCtrl',['$scope','settings',
        function($scope, settings){
            $scope.prefix = settings.classNamePrefix;
        }]);
});