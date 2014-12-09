console.log('ContractHourService');
define(['services/services'], function (services) {
    services.factory('ContractHourService', function () {
        var items = {};

        items.query = function () {
            return {
                "values":[{
                    "id":"1",
                    "hours_type":"8",
                    "hours_amount":"8",
                    "hours_unit":"Day",
                    "fte_num":"1",
                    "fte_denom":"1",
                    "jobcontract_revision_id": "11"
                }]
            };
        };
        return items;
    });
});