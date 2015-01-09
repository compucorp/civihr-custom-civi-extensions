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

                $scope.revisionList.push.apply($scope.revisionList,revisionList);

                angular.forEach(revisionList, function(revision){
                    console.log( '{----! Revision: '+revision.id+' !----}');
                    console.log(revision);

                    promiseRevisionList.push($q.all({
                        revisionEntityIdObj: revision,
                        details: ContractDetailsService.getOne({
                            jobcontract_revision_id: revision.details_revision_id,
                            return: 'position, location'
                        }),
                        hours: ContractHoursService.getOne({
                            jobcontract_revision_id: revision.hour_revision_id,
                            return: 'hours_type'
                        }),
                        pay: ContractPayService.getOne({
                            jobcontract_revision_id: revision.pay_revision_id,
                            return: 'pay_scale, pay_annualized_est'
                        })
                    }));
                });

                return $q.all(promiseRevisionList);

            }).then(function(results){
                $scope.revisionDataList.push.apply($scope.revisionDataList,results);
            });

        }]);
});