define(['controllers/controllers', 'services/contract'], function(controllers){
    controllers.controller('RevisionListCtrl',['$scope', '$filter', '$q', 'settings', 'ContractService',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService', '$log',
        function($scope, $filter, $q, settings, ContractService, ContractDetailsService, ContractHoursService,
                 ContractPayService, $log){
            $log.debug('Controller: RevisionListCtrl');

            var contractId = $scope.contract.id;

            $scope.currentPage = 1;
            $scope.itemsPerPage = 10;
            $scope.maxSize = 5;

            $scope.$watch('currentPage + revisionDataList.length', function() {
                var start = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = start + $scope.itemsPerPage;

                $scope.revisionDataListPage = $scope.revisionDataList.slice(start, end);
            });

            function fetchRevisions(contractId){
                $scope.revisionList.length = 0;
                $scope.revisionDataList.length = 0;

                ContractService.getRevision(contractId).then(function(revisionList){
                    var promiseRevisionList = [];

                    revisionList = $filter('orderBy')(revisionList, 'id', true);

                    $scope.revisionList.push.apply($scope.revisionList,revisionList);

                    angular.forEach(revisionList, function(revision){
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
                                return: 'pay_scale, pay_annualized_est, pay_currency'
                            })
                        }));
                    });

                    return $q.all(promiseRevisionList);

                }).then(function(results){
                    $scope.revisionDataList.push.apply($scope.revisionDataList,results);
                });
            };
            fetchRevisions(contractId);

            $scope.$on('unsetIsPrimary',function(e, excludeContractId, revisionCreated){
                if (contractId == excludeContractId) {
                    if (revisionCreated) {
                        fetchRevisions(contractId);
                    }
                }
            });

        }]);
});