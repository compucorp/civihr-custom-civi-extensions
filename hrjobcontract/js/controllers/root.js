console.log('RootController');
define(['controllers/controllers'], function(controllers){
    controllers.controller('RootController',['$scope',
        function($scope, DetailsService){
            //TODO move to the app config, change to hrjc;
            $scope.prefix = 'hrjobcont-';
        }]);
});