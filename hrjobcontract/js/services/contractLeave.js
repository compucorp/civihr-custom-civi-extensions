console.log('ContractLeaveService');
define(['services/services'], function (services) {
    services.factory('ContractLeaveService', function () {
        var items = {};

        items.query = function () {
            return {
                "values":[{
                    "id":"1",
                    "leave_type":"1",
                    "leave_amount":"3",
                    "jobcontract_revision_id": "11"
                }]
            };
        };
        return items;
    });
});