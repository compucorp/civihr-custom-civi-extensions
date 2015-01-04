console.log('Controller: RevisionListCtrl');
define(['controllers/controllers', 'services/contract'], function(controllers){
    controllers.controller('RevisionListCtrl',['$scope', '$filter', '$q', 'settings', 'ContractService',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService',
        function($scope, $filter, $q, settings, ContractService, ContractDetailsService, ContractHoursService,
                 ContractPayService){

            var contractId = $scope.contract.id,
                promiseContractService = ContractService.getRevision(contractId);

            promiseContractService.then(function(revisionList){

                var promiseRevisionList = [];

                revisionList = $filter('orderBy')(revisionList, 'id', true);

                angular.forEach(revisionList, function(revision){
                    promiseRevisionList.push($q.all({
                        revisionId: revision.id,
                        details: ContractDetailsService.getOne({ jobcontract_revision_id: revision.details_revision_id }),
                        hours: ContractHoursService.getOne({ jobcontract_revision_id: revision.hour_revision_id }),
                        pay: ContractPayService.getOne({ jobcontract_revision_id: revision.pay_revision_id })
                    }));
                });

                return $q.all(promiseRevisionList);

            }).then(function(results){

                $scope.revisionList.push.apply($scope.revisionList,results);

            });

        }]);
});