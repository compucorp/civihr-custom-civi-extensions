console.log('Service: ContractListService');
define(['services/services'], function (services) {
    services.factory('ContractListService', function () {
        var items = {};

        items.query = function () {
            return {
                "values":[{
                    "id":"1",
                    "contact_id":"49"
                },{
                    "id":"2",
                    "contact_id":"49"
                },{
                    "id":"3",
                    "contact_id":"49"
                }]
            };
        };
        return items;
    });
});