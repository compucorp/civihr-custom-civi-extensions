define(['controllers/controllers',        'services/contact'], function(controllers){    controllers.controller('FormInsuranceCtrl',['$scope','ContactService', '$log',        function($scope, ContactService, $log){            $log.debug('Controller: FormInsuranceCtrl');            $scope.typehead = {                provider: '',                provider_life_insurance: ''            };            var field;            angular.forEach($scope.typehead,function(value, fieldName){                field = $scope.contract.insurance[fieldName];                if (field) {                    ContactService.getOne(field).then(function(result){                        $scope.typehead[fieldName] = result;                    });                }                $scope.$watch('typehead.'+fieldName, function(val){                    $scope.contract.insurance[fieldName] = val ? val.id : val;                });            });            $scope.search = function(val, contactSubType) {                return ContactService.search(val, {                    contact_type: 'Organization',                    contact_sub_type: contactSubType                }).then(function(results){                    return results;                });            }        }]);});