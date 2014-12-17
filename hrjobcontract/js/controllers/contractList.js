console.log('Controller: ContractListCtrl');
define(['controllers/controllers', 'services/utils'], function(controllers){
    controllers.controller('ContractListCtrl',['$scope','$rootElement','$modal','contractList','UtilsService','settings',
        function($scope, $rootElement, $modal, contractList, UtilsService, settings){

            $scope.contractCurrent = contractList;
            $scope.contractPast = [];
            $scope.utils = {
                absenceType: {}
            };

            var promiseAbsenceType = UtilsService.getAbsenceType();
            promiseAbsenceType.then(function(absenceType){
                $scope.utils.absenceType = absenceType;
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
                    $scope.contractCurrent.push(contract);
                });
            }

        }]);
});