console.log('Service: ContractDetailsService');
define(['services/services','filters/getObjByContractId'], function (services) {
    services.factory('ContractDetailsService', function ($filter) {
        var items = {};

        items.query = function (id) {
            var response = {
                "values": [{
                    "contract_id": "1",
                    "id": "12",
                    "position": "General Manager",
                    "title": "General Manager",
                    "funding_notes": "Notes",
                    "contract_type": "Apprentice",
                    "period_type": "",
                    "period_start_date": "2014-08-26",
                    "period_end_date": "",
                    "notice_amount": "3",
                    "notice_unit": "Month",
                    "notice_amount_employee": "0",
                    "notice_unit_employee": "",
                    "location": "Headquarters",
                    "is_primary": "1",
                    "jobcontract_revision_id": "92"
                },{
                    "contract_id": "2",
                    "id": "11",
                    "position": "Front-end Developer",
                    "title": "Front-end Developer",
                    "funding_notes": "Notes",
                    "contract_type": "Apprentice",
                    "period_type": "",
                    "period_start_date": "2014-08-26",
                    "period_end_date": "",
                    "notice_amount": "3",
                    "notice_unit": "Month",
                    "notice_amount_employee": "0",
                    "notice_unit_employee": "",
                    "location": "Headquarters",
                    "is_primary": "0",
                    "jobcontract_revision_id": "91"
                },{
                    "contract_id": "3",
                    "id": "10",
                    "position": "Back-end Developer",
                    "title": "Back-end Developer",
                    "funding_notes": "Notes",
                    "contract_type": "Apprentice",
                    "period_type": "",
                    "period_start_date": "2014-08-26",
                    "period_end_date": "",
                    "notice_amount": "3",
                    "notice_unit": "Month",
                    "notice_amount_employee": "0",
                    "notice_unit_employee": "",
                    "location": "Headquarters",
                    "is_primary": "0",
                    "jobcontract_revision_id": "90"
                }]
            }

            return typeof id !== 'undefined' ? $filter('getObjByContractId')(response.values, id) || response.values : response.values;
        };
        return items;
    });
});