console.log('RootController');
define(['controllers/controllers','mock'], function(controllers,mock){
    controllers.controller('RootController',['$scope','settings',
        function($scope, settings){
            $scope.prefix = settings.classNamePrefix;
        }]);
});