define(['controllers/controllers'], function(controllers){    controllers.controller('ExampleCtrl',['$scope', '$log',        function($scope, $log){            $log.debug('Controller: ExampleCtrl');            console.log('why you not show up?');        }]);});