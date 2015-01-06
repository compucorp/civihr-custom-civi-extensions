console.log('Controller: ContractListCtrl');
define(['controllers/controllers',
        'services/contractDetails',
        'services/utils'], function(controllers){
    controllers.controller('ContractListCtrl',['$scope','$rootElement','$modal','$q','contractList','ContractService',
        'ContractDetailsService', 'ContractHoursService', 'ContractPayService', 'ContractInsuranceService',
        'ContractPensionService', 'UtilsService','settings',
        function($scope, $rootElement, $modal, $q, contractList, ContractService, ContractDetailsService,
                 ContractHoursService, ContractPayService, ContractInsuranceService, ContractPensionService,
                 UtilsService, settings){

            $scope.contractListLoaded = false;
            $scope.contractCurrent = [];
            $scope.contractPast = [];
            $scope.utils = {
                absenceType: {}
            };


            $q.all({
                details: ContractDetailsService.model(),
                hours: ContractHoursService.model(),
                pay: ContractPayService.model(),
                insurance: ContractInsuranceService.model(),
                pension: ContractPensionService.model()
            }).then(function(model){
                $scope.model = model;

                angular.forEach(contractList,function(contract){
                    +contract.is_current ? $scope.contractCurrent.push(contract) : $scope.contractPast.push(contract);
                });
                $scope.contractListLoaded = true;
            });

            //TODO remove and use the fieldOptions
            var promiseAbsenceType = UtilsService.getAbsenceType();
            promiseAbsenceType.then(function(absenceType){
                $scope.utils.absenceType = absenceType;
            },function(reason){
                console.log('Failed: ' + reason);
            });

            var promiseHoursLocation = UtilsService.getHoursLocation();
            promiseHoursLocation.then(function(hoursLocation){
                $scope.utils.hoursLocation = hoursLocation;
            },function(reason){
                console.log('Failed: ' + reason);
            });

            $scope.modalContract = function(action){

                if (!action || action !== 'new') {
                    return null;
                }

                var modalInstance,
                    options = {
                        targetDomEl: $rootElement.find('div').eq(0),
                        templateUrl: settings.pathApp+'/views/modalForm.html?v='+(new Date()).getTime(),
                        size: 'lg',
                        controller: 'ModalContractNewCtrl',
                        resolve: {
                            utils: function(){
                                return $scope.utils
                            }
                        }
                    }

                modalInstance = $modal.open(options);

                modalInstance.result.then(function(contract){
                    +contract.is_current ? $scope.contractCurrent.push(contract) : $scope.contractPast.push(contract);
                });
            }

            $scope.delete = function(contractId) {
                ContractService.delete(contractId).then(function(result){

                    if (!result.is_error) {
                        function removeContractById(contractArray, id){

                            var i = 0,
                                len = contractArray.length;

                            for (i; i < len; i++){
                                if (+contractArray[i].id == id) {
                                    contractArray.splice(i,1);
                                    return id;
                                }
                            }

                            return null;
                        }

                        removeContractById($scope.contractCurrent, contractId) || removeContractById($scope.contractPast, contractId);
                    }
                });
            }

        }]);
});