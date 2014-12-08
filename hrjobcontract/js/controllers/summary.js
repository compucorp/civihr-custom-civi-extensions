console.log('SummaryController');
define(['controllers/controllers','services/details'], function(controllers){
    controllers.controller('SummaryController',['$scope','DetailsService',
        function($scope, DetailsService){
            var details = DetailsService.query();
            $scope.details = details.values[0];
        }]);
});