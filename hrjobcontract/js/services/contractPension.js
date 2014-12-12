console.log('Service: ContractPensionService');
define(['services/services','filters/getObjByContractId'], function (services) {
    services.factory('ContractPensionService', function ($filter) {
        var items = {};

        items.query = function (id) {
            var response = {
                "values":[{
                    "contract_id":"1",
                    "id":"1",
                    "is_enrolled":"0",
                    "ee_contrib_pct":"2",
                    "er_contrib_pct":"10",
                    "pension_type":"Employer Pension",
                    "ee_contrib_abs":"0.00",
                    "jobcontract_revision_id": "23"
                },{
                    "contract_id":"2",
                    "id":"2",
                    "is_enrolled":"0",
                    "ee_contrib_pct":"2",
                    "er_contrib_pct":"10",
                    "pension_type":"Employer Pension",
                    "ee_contrib_abs":"0.00",
                    "jobcontract_revision_id": "24"
                },{
                    "contract_id":"3",
                    "id":"3",
                    "is_enrolled":"0",
                    "ee_contrib_pct":"2",
                    "er_contrib_pct":"10",
                    "pension_type":"Employer Pension",
                    "ee_contrib_abs":"0.00",
                    "jobcontract_revision_id": "25"
                }]
            }

            return typeof id !== 'undefined' ? $filter('getObjByContractId')(response.values, id) || response.values : response.values;
        };
        return items;
    });
});