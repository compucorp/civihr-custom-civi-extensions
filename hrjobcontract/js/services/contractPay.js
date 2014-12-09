console.log('ContractPayService');
define(['services/services'], function (services) {
    services.factory('ContractPayService', function () {
        var items = {};

        items.query = function () {
            return {
                "values":[{
                    "id":"1",
                    "pay_scale":"NJC pay scale",
                    "is_paid":"1",
                    "pay_amount":"200.00",
                    "pay_unit":"Hour",
                    "pay_annualized_est":"0.00",
                    "pay_is_auto_est":"1",
                    "jobcontract_revision_id": "11"
                }]
            };
        };
        return items;
    });
});