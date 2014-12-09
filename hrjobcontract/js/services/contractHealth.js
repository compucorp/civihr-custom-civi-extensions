console.log('ContractHealthService');
define(['services/services','filters/getObjByContractId'], function (services) {
    services.factory('ContractHealthService', function ($filter) {
        var items = {};

        items.query = function (id) {
            var response = {
                "values": [{
                    "contract_id":"1",
                    "id":"1",
                    "plan_type":"Family",
                    "description":"Description2",
                    "dependents":"dependents2",
                    "plan_type_life_insurance":"Family",
                    "description_life_insurance":"LI Description2",
                    "dependents_life_insurance":"LI dependents2",
                    "jobcontract_revision_id": "11"
                },{
                    "contract_id":"2",
                    "id":"2",
                    "plan_type":"Family",
                    "description":"Description2",
                    "dependents":"dependents2",
                    "plan_type_life_insurance":"Family",
                    "description_life_insurance":"LI Description2",
                    "dependents_life_insurance":"LI dependents2",
                    "jobcontract_revision_id": "12"
                },{
                    "contract_id":"3",
                    "id":"3",
                    "plan_type":"Family",
                    "description":"Description2",
                    "dependents":"dependents2",
                    "plan_type_life_insurance":"Family",
                    "description_life_insurance":"LI Description2",
                    "dependents_life_insurance":"LI dependents2",
                    "jobcontract_revision_id": "13"
                }]
            }

            return typeof id !== 'undefined' ? $filter('getObjByContractId')(response.values, id) || response.values : response.values;
        };
        return items;
    });
});