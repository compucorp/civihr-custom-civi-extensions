console.log('ContractPensionService');
define(['services/services'], function (services) {
    services.factory('ContractPensionService', function () {
        var items = {};

        items.query = function () {
            return {
                "values":[{
                    "id":"1",
                    "is_enrolled":"0",
                    "ee_contrib_pct":"2",
                    "er_contrib_pct":"10",
                    "pension_type":"Employer Pension",
                    "ee_contrib_abs":"0.00",
                    "jobcontract_revision_id": "11"
                }]
            };
        };
        return items;
    });
});