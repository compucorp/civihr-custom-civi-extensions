console.log('Controller: RevisionListCtrl');
define(['controllers/controllers', 'services/contract'], function(controllers){
    controllers.controller('RevisionListCtrl',['$scope', '$filter', '$q', 'settings', 'ContractService',
        function($scope, $filter, $q, settings, ContractService){

            var contractId = $scope.contract.id,
                promiseContractService = ContractService.getRevision(contractId);

            promiseContractService.then(function(results){
                results.pop();
                $scope.revisionList.push.apply($scope.revisionList,$filter('orderBy')(results, 'id', true));
            });

        }]);
});