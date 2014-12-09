console.log('ContractLeaveService');
define(['services/services','filters/getObjByContractId'], function (services) {
    services.factory('ContractLeaveService', function ($filter) {
        var items = {};

        items.query = function (id) {
            var response = {
                "values":[{
                    "contract_id":"1",
                    "id":"1",
                    "leave_type":"1",
                    "leave_amount":"3",
                    "jobcontract_revision_id": "17"
                },{
                    "contract_id":"2",
                    "id":"2",
                    "leave_type":"1",
                    "leave_amount":"3",
                    "jobcontract_revision_id": "18"
                },{
                    "contract_id":"3",
                    "id":"3",
                    "leave_type":"1",
                    "leave_amount":"3",
                    "jobcontract_revision_id": "19"
                }]
            }

            return typeof id !== 'undefined' ? $filter('getObjByContractId')(response.values, id) || response.values : response.values;
        };
        return items;
    });
});