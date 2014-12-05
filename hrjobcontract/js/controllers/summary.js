console.log('SummaryController');
define(['controllers/controllers','services/details'], function(controllers){
    controllers.controller('SummaryController',['$scope','DetailsService',
        function($scope, DetailsService){
            $scope.details = DetailsService.query();
        }]);
});