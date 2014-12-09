console.log('ContractPayService');
define(['services/services','filters/getObjByContractId'], function (services) {
    services.factory('ContractPayService', function ($filter) {
        var items = {};

        items.query = function (id) {
            var response = {
                "values":[{
                    "contract_id":"1",
                    "id":"1",
                    "pay_scale":"NJC pay scale",
                    "is_paid":"1",
                    "pay_amount":"200.00",
                    "pay_unit":"Hour",
                    "pay_annualized_est":"0.00",
                    "pay_is_auto_est":"1",
                    "jobcontract_revision_id": "20"
                },{
                    "contract_id":"2",
                    "id":"2",
                    "pay_scale":"NJC pay scale",
                    "is_paid":"1",
                    "pay_amount":"200.00",
                    "pay_unit":"Hour",
                    "pay_annualized_est":"0.00",
                    "pay_is_auto_est":"1",
                    "jobcontract_revision_id": "21"
                },{
                    "contract_id":"3",
                    "id":"3",
                    "pay_scale":"NJC pay scale",
                    "is_paid":"1",
                    "pay_amount":"200.00",
                    "pay_unit":"Hour",
                    "pay_annualized_est":"0.00",
                    "pay_is_auto_est":"1",
                    "jobcontract_revision_id": "22"
                }]
            }

            return typeof id !== 'undefined' ? $filter('getObjByContractId')(response.values, id) || response.values : response.values;
        };
        return items;
    });
});