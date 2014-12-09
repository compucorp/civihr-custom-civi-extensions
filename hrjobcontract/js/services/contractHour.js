console.log('ContractHourService');
define(['services/services','filters/getObjByContractId'], function (services) {
    services.factory('ContractHourService', function ($filter) {
        var items = {};

        items.query = function (id) {
            var response = {
                "values": [{
                    "values":[{
                        "contract_id":"1",
                        "id":"1",
                        "hours_type":"8",
                        "hours_amount":"8",
                        "hours_unit":"Day",
                        "fte_num":"1",
                        "fte_denom":"1",
                        "jobcontract_revision_id": "14"
                    },{
                        "contract_id":"2",
                        "id":"2",
                        "hours_type":"8",
                        "hours_amount":"8",
                        "hours_unit":"Day",
                        "fte_num":"1",
                        "fte_denom":"1",
                        "jobcontract_revision_id": "15"
                    },{
                        "contract_id":"3",
                        "id":"3",
                        "hours_type":"8",
                        "hours_amount":"8",
                        "hours_unit":"Day",
                        "fte_num":"1",
                        "fte_denom":"1",
                        "jobcontract_revision_id": "16"
                    }]
                }]
            }

            return typeof id !== 'undefined' ? $filter('getObjByContractId')(response.values, id) || response.values : response.values;
        };
        return items;
    });
});