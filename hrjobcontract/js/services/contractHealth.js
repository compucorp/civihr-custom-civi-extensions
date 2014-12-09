console.log('ContractHealthService');
define(['services/services'], function (services) {
    services.factory('ContractHealthService', function () {
        var items = {};

        items.query = function () {
            return {
                "values": [{
                    "id":"1",
                    "plan_type":"Family",
                    "description":"Description2",
                    "dependents":"dependents2",
                    "plan_type_life_insurance":"Family",
                    "description_life_insurance":"LI Description2",
                    "dependents_life_insurance":"LI dependents2",
                    "jobcontract_revision_id": "11"
                }]
            };
        };
        return items;
    });
});